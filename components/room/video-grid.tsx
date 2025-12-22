import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RemoteVideo, LocalVideo } from '@/components/webrtc/video-player'
import { useGalleryLayout } from '@/hooks/use-gallery-layout'
import { cn } from '@/lib/utils'
import { Activity, Monitor } from 'lucide-react'

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

    // THEATER MODE DETECTION
    const presentationPeer = allParticipants.find(p => p.isPresentation === true || (p.stream && p.stream.getVideoTracks().length > 1))
    const isTheaterMode = !!presentationPeer

    const galleryLayout = useGalleryLayout(containerRef, isTheaterMode ? Math.max(1, allParticipants.filter(p => p.userId !== (presentationPeer?.userId)).length) : allParticipants.length)

    const calcVolume = (p: any) => {
        if (p.isLocal) return 0
        if (selectedLang === 'original' || selectedLang === 'floor') return p.role === 'interpreter' ? 0 : 1.0
        if (p.role === 'interpreter' && p.language === selectedLang) return volumeBalance / 100
        if (p.role === 'interpreter' && p.language !== selectedLang) return 0
        return (100 - volumeBalance) / 100
    }

    const getPresentationStream = (p: any) => {
        if (!p || !p.stream) return null
        if (p.isPresentation) return p.stream
        const tracks = p.stream.getVideoTracks()
        return tracks.length > 1 ? new MediaStream([tracks[tracks.length - 1]]) : p.stream
    }

    return (
        <div ref={containerRef} className="w-full h-full p-2 flex flex-col items-center justify-center overflow-hidden relative">
            <div className="absolute top-4 left-4 z-[100] bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                <Activity className="h-3 w-3 animate-pulse" />
                V7.0 {isTheaterMode ? "APRESENTANDO" : "GALLERY"}
            </div>

            {isTheaterMode && presentationPeer ? (
                <div className="w-full h-full flex flex-col md:flex-row gap-4 p-2 overflow-hidden">
                    {/* MAIN STAGE */}
                    <div className="flex-[4] h-full relative bg-zinc-950 rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-3xl">
                        {presentationPeer.isLocal ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 bg-zinc-900/80 backdrop-blur-sm z-10">
                                <Monitor className="h-20 w-20 mb-4 opacity-20" />
                                <p className="text-xl font-bold">Você está compartilhando sua tela</p>
                                <p className="text-sm opacity-60">Para evitar o efeito de túnel infinito, as pessoas vêem sua tela mas você vê este aviso.</p>
                            </div>
                        ) : (
                            <RemoteVideo
                                stream={getPresentationStream(presentationPeer)}
                                name="Apresentação"
                                role="presentation"
                                volume={0}
                                connectionState="connected"
                            />
                        )}
                    </div>

                    {/* SIDEBAR */}
                    <div className="flex-1 h-full overflow-y-auto no-scrollbar flex flex-col gap-3 min-w-[200px]">
                        <AnimatePresence>
                            {allParticipants.filter(p => !p.isPresentation && p.userId !== presentationPeer.userId).map((p) => (
                                <motion.div key={p.userId} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="aspect-video w-full shrink-0">
                                    {p.isLocal ? (
                                        <LocalVideo stream={p.stream} role={p.role} micOff={!p.micOn} cameraOff={!p.cameraOn} name={p.name} />
                                    ) : (
                                        <RemoteVideo stream={p.stream} name={p.name || p.userId} role={p.role} volume={calcVolume(p)} connectionState={p.connectionState} />
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            ) : (
                /* GALLERY */
                <div
                    className="grid gap-2 justify-center content-center transition-all duration-500"
                    style={{
                        gridTemplateColumns: `repeat(${galleryLayout.cols}, ${galleryLayout.width}px)`,
                        gridTemplateRows: `repeat(${galleryLayout.rows}, ${galleryLayout.height}px)`,
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        {allParticipants.map((p) => (
                            <motion.div key={p.userId} layout initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ width: galleryLayout.width, height: galleryLayout.height }} className="box-border">
                                {p.isLocal ? (
                                    <LocalVideo stream={p.stream} role={p.role} micOff={!p.micOn} cameraOff={!p.cameraOn} name={p.name} />
                                ) : (
                                    <RemoteVideo stream={p.stream} name={p.name || p.userId} role={p.role} volume={calcVolume(p)} connectionState={p.connectionState} />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}
