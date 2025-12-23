import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, MessageSquare, X, Lock } from 'lucide-react'
import { Message } from '@/hooks/use-chat'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ChatPanelProps {
    userId: string
    messages: Message[]
    peers: any[] // Added peers prop
    onSendMessage: (text: string, recipientId?: string) => void
    onClose?: () => void
}

export function ChatPanel({
    userId,
    messages,
    peers,
    onSendMessage,
    onClose
}: ChatPanelProps) {
    const [inputValue, setInputValue] = useState('')
    const [recipientId, setRecipientId] = useState<string>('everyone')
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSubmit = () => {
        if (!inputValue.trim()) return
        const targetId = recipientId === 'everyone' ? undefined : recipientId
        onSendMessage(inputValue, targetId)
        setInputValue('')
    }

    const getPeerName = (id: string) => {
        const peer = peers.find(p => p.userId === id)
        if (peer) return peer.name || peer.userId.split('-')[1] || 'Participante'
        if (id === userId) return 'Você'
        return 'Desconhecido'
    }

    return (
        <div className="flex flex-col h-full bg-card/40 backdrop-blur-xl border-l border-border w-full md:w-80 animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[#06b6d4]" />
                    <h3 className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Chat da Sala</h3>
                </div>
                {onClose && (
                    <Button variant="ghost" size="icon" className="h-6 w-6 md:hidden text-muted-foreground" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 text-center px-4">
                        <MessageSquare className="h-8 w-8 mb-2 opacity-20" />
                        <p className="text-xs">Nenhuma mensagem ainda. Comece a conversa!</p>
                    </div>
                )}
                {messages.map((msg) => {
                    const isPrivate = !!msg.recipientId
                    const isSystem = msg.sender === 'system'

                    return (
                        <div key={msg.id} className={`flex flex-col ${msg.sender === userId ? 'items-end' : 'items-start'}`}>
                            <div className="flex items-center gap-1 mb-1">
                                {isPrivate && <Lock className="h-3 w-3 text-yellow-500/70" />}
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter flex gap-1">
                                    {msg.sender === userId ? 'Você' : (msg.senderName || (msg.sender.includes('guest-') ? 'Convidado' : msg.sender.split('-')[1] || msg.sender))}
                                    {isPrivate && msg.recipientId && (
                                        <span className="text-yellow-600/70 lowercase font-normal ml-1">
                                            (privado {msg.sender === userId ? `para ${getPeerName(msg.recipientId)}` : 'para você'})
                                        </span>
                                    )}
                                </span>
                                {msg.role?.toLowerCase() === 'admin' && (
                                    <span className="text-[8px] bg-red-500/20 text-red-400 px-1 rounded border border-red-500/30 font-bold uppercase">Admin</span>
                                )}
                                {msg.role?.toLowerCase() === 'interpreter' && (
                                    <span className="text-[8px] bg-purple-500/20 text-purple-400 px-1 rounded border border-purple-500/30 font-bold uppercase">Intérprete</span>
                                )}
                            </div>
                            <div className={`px-3 py-2 rounded-2xl text-sm max-w-[90%] ${isPrivate
                                    ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-100'
                                    : msg.sender === userId
                                        ? 'bg-[#06b6d4] text-white rounded-tr-none'
                                        : 'bg-accent/50 text-foreground border border-border rounded-tl-none'
                                } ${isPrivate ? 'border' : ''}`}>
                                {msg.text}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="p-4 border-t border-border bg-accent/20 space-y-2">
                <Select value={recipientId} onValueChange={setRecipientId}>
                    <SelectTrigger className="w-full h-8 text-xs bg-black/20 border-white/10 text-gray-300">
                        <SelectValue placeholder="Enviar para..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="everyone">Todos na sala</SelectItem>
                        {peers.map(peer => (
                            <SelectItem key={peer.userId} value={peer.userId}>
                                {peer.name || peer.userId}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <form
                    onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
                    className="flex gap-2"
                >
                    <Input
                        placeholder={recipientId === 'everyone' ? "Mensagem para todos..." : "Mensagem privada..."}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="bg-background border-border h-10 rounded-xl text-sm focus-visible:ring-[#06b6d4]"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className={`${recipientId === 'everyone' ? 'bg-[#06b6d4] hover:bg-[#0891b2]' : 'bg-yellow-600 hover:bg-yellow-700'} rounded-xl h-10 w-10 shrink-0 transition-colors`}
                    >
                        {recipientId === 'everyone' ? <Send className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    </Button>
                </form>
            </div>
        </div >
    )
}
