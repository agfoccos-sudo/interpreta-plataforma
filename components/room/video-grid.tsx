import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RemoteVideo, LocalVideo } from '@/components/webrtc/video-player'
import { useGalleryLayout } from '@/hooks/use-gallery-layout'
import { cn } from '@/lib/utils'
import { Activity } from 'lucide-react'

interface VideoGridProps {
    peers: any[]
    localStream: MediaStream | null
    currentRole: string
    micOn: boolean
    cameraOn: boolean
    mode: 'gallery' | 'speaker'
    onSpeakerChange?: (userId: string) => void
    activeSpeakerId?: string | null
    pinnedSpeakerId?: string | null
    onPeerSpeaking?: (id: string, isSpeaking: boolean) => void
    localUserName?: string
    selectedLang?: string
    volumeBalance?: number
    handRaised?: boolean
    logs?: string[]
    userCount?: number
}

export function VideoGrid({
    peers,
    localStream,
    currentRole,
    micOn,
    cameraOn,
    mode,
    onSpeakerChange,
    activeSpeakerId,
    pinnedSpeakerId,
    onPeerSpeaking,
    localUserName = "Você",
    selectedLang = 'original',
    volumeBalance = 80,
    handRaised
}: VideoGridProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const allParticipants = [
        { userId: 'local', isLocal: true, stream: localStream, role: currentRole, micOn, cameraOn, handRaised, name: localUserName },
        ...peers.map(p => ({ ...p, isLocal: false }))
    ]

    const galleryLayout = useGalleryLayout(containerRef, allParticipants.length)

    const calcVolume = (p: any) => {
        if (p.isLocal) return 0
        if (selectedLang === 'original' || selectedLang === 'floor') {
            if (p.role !== 'interpreter') return 1.0
            return 0
        }
        if (p.role === 'interpreter' && p.language === selectedLang) {
            return volumeBalance / 100
        }
        if (p.role === 'interpreter' && p.language !== selectedLang) {
            return 0
        }
        if (p.role !== 'interpreter') {
            return (100 - volumeBalance) / 100
        }
        return 0
    }

    console.log(`[VideoGrid] Rendering ${allParticipants.length} items. Peers: ${peers.length}`)

    return (
        <div ref={containerRef} className="w-full h-full p-2 flex flex-col items-center justify-center overflow-hidden relative">
            {/* FLOATING DEBUG COUNTER */}
            <div className="absolute top-4 left-4 z-[100] bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                <Activity className="h-3 w-3 animate-pulse" />
                V4.2 PARTICIPANTS: {allParticipants.length}
            </div>

            <div
                className="grid gap-2 justify-center content-center transition-all duration-500"
                style={{
                    gridTemplateColumns: `repeat(${galleryLayout.cols}, ${galleryLayout.width}px)`,
                    gridTemplateRows: `repeat(${galleryLayout.rows}, ${galleryLayout.height}px)`,
                }}
            >
                <AnimatePresence mode="popLayout">
                    {allParticipants.map((p) => (
                        <motion.div
                            key={p.userId}
                            layout
                            exit={{ opacity: 0, scale: 0.5 }}
                            onClick={() => onSpeakerChange?.(p.userId)}
                            style={{
                                minWidth: '200px',
                                minHeight: '112px'
                            }}
                            className={cn(
                                "w-full h-full box-border cursor-pointer transition-transform active:scale-[0.98]",
                                pinnedSpeakerId === p.userId && "ring-4 ring-amber-500 rounded-[2.5rem]"
                            )}
                        >
                            {p.isLocal ? (
                                <LocalVideo stream={p.stream} role={p.role} micOff={!p.micOn} cameraOff={!p.cameraOn} name={p.name} handRaised={p.handRaised} onSpeakingChange={(s) => onPeerSpeaking?.('local', s)} />
                            ) : (
                                <RemoteVideo
                                    stream={p.stream}
                                    name={p.name || p.userId}
                                    role={p.role}
                                    micOff={p.micOn === false}
                                    cameraOff={p.cameraOn === false}
                                    handRaised={p.handRaised}
                                    volume={calcVolume(p)}
                                    connectionState={p.connectionState}
                                    onSpeakingChange={(s) => onPeerSpeaking?.(p.userId, s)}
                                />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
