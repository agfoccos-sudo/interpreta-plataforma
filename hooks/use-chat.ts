import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface Message {
    id: string
    sender: string
    senderName?: string
    text: string
    timestamp: number
    role: string
}

function playNotificationSound() {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
        console.error("Audio play failed", e);
    }
}

export function useChat(roomId: string, userId: string, userRole: string, userName: string) {
    const [messages, setMessages] = useState<Message[]>([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const isActiveRef = useRef(false)
    const supabase = createClient()
    const channelRef = useRef<any>(null)

    // Keep ref in sync
    useEffect(() => {
        isActiveRef.current = isActive
    }, [isActive])

    useEffect(() => {
        if (!roomId) return

        // 1. Fetch History
        const fetchHistory = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('room_id', roomId)
                .order('created_at', { ascending: true })

            if (data) {
                const mapped: Message[] = data.map((d: any) => ({
                    id: d.id,
                    sender: d.sender_id,
                    senderName: d.sender_name,
                    text: d.content,
                    timestamp: new Date(d.created_at).getTime(),
                    role: d.role
                }))
                setMessages(mapped)
            }
        }
        fetchHistory()

        // 2. Subscribe to NEW additions (Realtime & Broadcast Fallback)
        const channel = supabase.channel(`room-chat:${roomId}`)
        channelRef.current = channel

        channel
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `room_id=eq.${roomId}`
                },
                (payload) => {
                    const newMsg = payload.new as any
                    if (!newMsg) return

                    const msg: Message = {
                        id: newMsg.id,
                        sender: newMsg.sender_id,
                        senderName: newMsg.sender_name,
                        text: newMsg.content,
                        timestamp: new Date(newMsg.created_at).getTime(),
                        role: newMsg.role
                    }

                    setMessages(prev => {
                        // CRITICAL: Deduplicate by ID
                        if (prev.some(m => m.id === msg.id)) return prev
                        return [...prev, msg]
                    })

                    // Notify if not active and NOT my own message
                    if (newMsg.sender_id !== userId && !isActiveRef.current) {
                        setUnreadCount(prev => prev + 1)
                        playNotificationSound()
                    }
                }
            )
            .on('broadcast', { event: 'chat-message' }, (payload) => {
                const msg = payload.payload as Message
                if (msg.sender === userId) return // Ignore own

                setMessages(prev => {
                    if (prev.some(m => m.id === msg.id)) return prev
                    return [...prev, msg]
                })

                if (!isActiveRef.current) {
                    setUnreadCount(prev => prev + 1)
                    playNotificationSound()
                }
            })
            .subscribe()

        return () => {
            channel.unsubscribe()
        }
    }, [roomId, userId])

    const sendMessage = async (text: string) => {
        if (!text.trim()) return

        // Use a consistent ID to prevent duplication between Broadcast and Postgres
        const msgId = crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15)

        const msg: Message = {
            id: msgId,
            sender: userId,
            senderName: userName,
            text,
            timestamp: Date.now(),
            role: userRole
        }

        // 1. Optimistic local update
        setMessages(prev => [...prev, msg])

        // 2. Broadcast for real-time (Ensures Guest delivery)
        channelRef.current?.send({
            type: 'broadcast',
            event: 'chat-message',
            payload: msg
        })

        // 3. Persistent storage
        try {
            const { error } = await supabase.from('messages').insert({
                id: msgId, // Use the same ID
                room_id: roomId,
                sender_id: userId,
                sender_name: userName,
                content: text,
                role: userRole
            })
            if (error) {
                console.error("DB Chat Insert failed:", error)
                // If it failed because of the ID manually set (unlikely in modern Supabase), 
                // we might want a fallback, but generally it works.
            }
        } catch (e) {
            console.error("Chat Insert exception:", e)
        }
    }

    const markAsRead = () => {
        setUnreadCount(0)
    }

    return {
        messages,
        sendMessage,
        unreadCount,
        markAsRead,
        setIsActive
    }
}
