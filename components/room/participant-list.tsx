'use client'

import { Users, User as UserIcon, Mic, X, Hand, MoreVertical, ShieldAlert, Gavel, Languages, Crown, ShieldBan, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react'
import { ManageLanguagesDialog } from './manage-languages-dialog'

interface Peer {
    userId: string
    role: string
    name?: string
    handRaised?: boolean
}

export function ParticipantList({
    peers,
    userRole,
    userCount,
    isHost,
    hostId,
    onPromote,
    onKick,
    onUpdateRole,
    onUpdateLanguages,
    onClose
}: {
    peers: any[],
    userRole: string,
    userCount: number,
    isHost: boolean,
    hostId: string | null,
    onPromote: (id: string) => void,
    onKick?: (id: string) => void,
    onUpdateRole?: (id: string, role: string) => void,
    onUpdateLanguages?: (id: string, langs: string[]) => void,
    onClose?: () => void
}) {
    const [selectedUserForLang, setSelectedUserForLang] = useState<{ id: string, name: string, languages: string[] } | null>(null)

    const canManageContext = isHost || userRole === 'admin'

    return (
        <div className="flex flex-col h-full bg-card/40 backdrop-blur-xl border-l border-border w-full md:w-80 animate-in slide-in-from-right duration-300">
            {/* Manage Languages Dialog */}
            {selectedUserForLang && (
                <ManageLanguagesDialog
                    isOpen={!!selectedUserForLang}
                    onClose={() => setSelectedUserForLang(null)}
                    userName={selectedUserForLang.name}
                    currentLanguages={selectedUserForLang.languages}
                    onSave={(langs) => onUpdateLanguages?.(selectedUserForLang.id, langs)}
                />
            )}

            <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#06b6d4]" />
                    <h3 className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Participantes</h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className="bg-accent/50 px-2 py-0.5 rounded text-[10px] font-black text-[#06b6d4] border border-border">
                        {userCount}
                    </span>
                    {onClose && (
                        <Button variant="ghost" size="icon" className="h-6 w-6 md:hidden text-muted-foreground" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {/* Me */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-accent/20 border border-[#06b6d4]/30">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#06b6d4]/20 flex items-center justify-center border border-[#06b6d4]/40">
                            <UserIcon className="h-4 w-4 text-[#06b6d4]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground">Você</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-muted-foreground uppercase font-black">{userRole}</span>
                                {isHost && (
                                    <span className="bg-[#06b6d4]/20 text-[#06b6d4] text-[8px] px-1.5 py-0.5 rounded-full font-black border border-[#06b6d4]/30 uppercase tracking-tighter shadow-sm">
                                        Host
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* My Status Icons */}
                    <div className="flex items-center gap-2">
                        {/* Assuming we can pass myHandRaised info here too if available, but props only have peers. */}
                        {/* We will just rely on standard role icon for now or add hand if passed */}
                        {(userRole?.toLowerCase() === 'interpreter' || userRole?.toLowerCase() === 'admin') && <Mic className="h-3 w-3 text-purple-400" />}
                    </div>
                </div>

                {/* Others */}
                {peers.map((peer) => (
                    <div key={peer.userId} className="flex items-center justify-between p-3 rounded-2xl bg-accent/50 border border-border hover:border-[#06b6d4]/30 transition-colors group">
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground truncate">{peer.name || peer.userId.split('-')[1] || peer.userId}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-muted-foreground uppercase font-black">{peer.role}</span>
                                    {peer.userId === hostId && (
                                        <span className="bg-[#06b6d4]/20 text-[#06b6d4] text-[8px] px-1.5 py-0.5 rounded-full font-black border border-[#06b6d4]/30 uppercase tracking-tighter">
                                            Host
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {peer.handRaised && (
                                <div className="bg-amber-500/20 p-1 rounded-full animate-pulse" title="Mão levantada">
                                    <Hand className="h-3 w-3 text-amber-500" />
                                </div>
                            )}
                            {(peer.role?.toLowerCase() === 'interpreter' || peer.role?.toLowerCase() === 'admin') && <Mic className="h-3 w-3 text-purple-400" />}

                            {/* Admin Actions Dropdown - Visible only to Host/Admin for others */}
                            {canManageContext && peer.userId !== hostId && !peer.isHost && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-[#020817] border-white/10 text-white w-56">
                                        <DropdownMenuLabel>Ações de Admin</DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-white/10" />

                                        {/* Promote/Demote Interpreter */}
                                        {peer.role === 'interpreter' ? (
                                            <DropdownMenuItem onClick={() => onUpdateRole?.(peer.userId, 'participant')} className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer">
                                                <ShieldAlert className="h-4 w-4 mr-2" />
                                                Rebaixar para Participante
                                            </DropdownMenuItem>
                                        ) : (
                                            <DropdownMenuItem onClick={() => onUpdateRole?.(peer.userId, 'interpreter')} className="focus:bg-purple-500/10 focus:text-purple-400 cursor-pointer">
                                                <Languages className="h-4 w-4 mr-2" />
                                                Promover a Intérprete
                                            </DropdownMenuItem>
                                        )}

                                        {/* Manage Languages (Only for Interpreter) */}
                                        {peer.role === 'interpreter' && (
                                            <DropdownMenuItem
                                                onClick={() => setSelectedUserForLang({ id: peer.userId, name: peer.name, languages: [] })} // Pass current langs if available in peer metadata? Need to add 'allowedLanguages' to peer metadata if we want to pre-fill correctly.
                                                className="focus:bg-blue-500/10 focus:text-blue-400 cursor-pointer"
                                            >
                                                <Settings className="h-4 w-4 mr-2" />
                                                Gerenciar Idiomas
                                            </DropdownMenuItem>
                                        )}

                                        <DropdownMenuSeparator className="bg-white/10" />

                                        {/* Host Promotion */}
                                        {isHost && (
                                            <DropdownMenuItem onClick={() => onPromote(peer.userId)} className="focus:bg-yellow-500/10 focus:text-yellow-400 cursor-pointer">
                                                <Crown className="h-4 w-4 mr-2" />
                                                Tornar Anfitrião
                                            </DropdownMenuItem>
                                        )}

                                        {/* Kick */}
                                        <DropdownMenuItem onClick={() => onKick?.(peer.userId)} className="focus:bg-red-900/20 focus:text-red-500 cursor-pointer text-red-500">
                                            <Gavel className="h-4 w-4 mr-2" />
                                            Expulsar da Sala
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                ))}

                {peers.length === 0 && (
                    <div className="py-20 text-center text-gray-600">
                        <p className="text-xs italic">Ninguém mais na sala.</p>
                    </div>
                )}
            </div>

            <div className="p-4 bg-gradient-to-t from-black/40 to-transparent">
                <p className="text-[10px] text-gray-500 text-center font-medium leading-tight">
                    A arquitetura P2P garante que sua conexão seja direta e privada.
                </p>
            </div>
        </div>
    )
}
