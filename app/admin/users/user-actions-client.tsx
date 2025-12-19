'use client'

import { Button } from "../../../components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, Settings2, Languages } from 'lucide-react'
import React, { useState } from 'react'
import { updateUserRole, updateUserStatus, updateUserLimits, updateProfileLanguages } from '../actions'

interface Profile {
    id: string;
    email: string;
    full_name: string | null;
    role: string;
    status: 'active' | 'suspended' | 'banned';
    limits?: {
        max_meetings?: number;
        max_participants?: number;
        can_record?: boolean;
    };
    languages?: string[]; // Added languages
}

export function UserActionsClient({ profile }: { profile: Profile }): React.ReactNode {
    const status = profile.status || 'active'
    const [openLimits, setOpenLimits] = useState(false)
    const [openLang, setOpenLang] = useState(false)
    const [limits, setLimits] = useState({
        max_meetings: profile.limits?.max_meetings || 5,
        max_participants: profile.limits?.max_participants || 50,
        can_record: profile.limits?.can_record || false
    })

    // Languages State
    const [selectedLangs, setSelectedLangs] = useState<string[]>(profile.languages || [])

    const handleSaveLimits = async () => {
        try {
            await updateUserLimits(profile.id, limits)
            setOpenLimits(false)
        } catch (error) {
            alert('Erro ao salvar limites')
        }
    }

    const handlePromoteToInterpreter = async () => {
        setOpenLang(true)
    }

    const confirmInterpreterPromotion = async () => {
        try {
            await updateUserRole(profile.id, 'interpreter')
            await updateProfileLanguages(profile.id, selectedLangs)
            setOpenLang(false)
            alert('Usuário promovido a Intérprete com sucesso!')
        } catch (error) {
            alert('Erro ao promover.')
        }
    }

    const handleLangToggle = (code: string) => {
        if (selectedLangs.includes(code)) {
            setSelectedLangs(selectedLangs.filter(l => l !== code))
        } else {
            setSelectedLangs([...selectedLangs, code])
        }
    }

    return (
        <div className="flex items-center gap-2">
            {/* Limits Modal */}
            <Dialog open={openLimits} onOpenChange={setOpenLimits}>
                <DialogContent className="bg-[#0f172a] border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Settings2 className="h-5 w-5 text-[#06b6d4]" />
                            Editar Limites: {profile.full_name || 'Usuário'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="meetings" className="text-right">Max Reuniões</Label>
                            <Input
                                id="meetings"
                                type="number"
                                value={limits.max_meetings}
                                onChange={(e) => setLimits({ ...limits, max_meetings: parseInt(e.target.value) })}
                                className="col-span-3 bg-white/5 border-white/10"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="participants" className="text-right">Max Partic.</Label>
                            <Input
                                id="participants"
                                type="number"
                                value={limits.max_participants}
                                onChange={(e) => setLimits({ ...limits, max_participants: parseInt(e.target.value) })}
                                className="col-span-3 bg-white/5 border-white/10"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveLimits} className="bg-[#06b6d4] hover:bg-[#0891b2]">
                            Salvar Alterações
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Language Selection Modal (Interpreter) */}
            <Dialog open={openLang} onOpenChange={setOpenLang}>
                <DialogContent className="bg-[#0f172a] border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Languages className="h-5 w-5 text-[#06b6d4]" />
                            Definir Idiomas do Intérprete
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <p className="text-sm text-gray-400">Selecione os idiomas que este usuário está habilitado a interpretar.</p>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="pt"
                                    checked={selectedLangs.includes('pt')}
                                    onCheckedChange={() => handleLangToggle('pt')}
                                />
                                <label htmlFor="pt" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Português (BR)
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="en"
                                    checked={selectedLangs.includes('en')}
                                    onCheckedChange={() => handleLangToggle('en')}
                                />
                                <label htmlFor="en" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Inglês (EN)
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="es"
                                    checked={selectedLangs.includes('es')}
                                    onCheckedChange={() => handleLangToggle('es')}
                                />
                                <label htmlFor="es" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Espanhol (ES)
                                </label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={confirmInterpreterPromotion} className="bg-[#06b6d4] hover:bg-[#0891b2]">
                            Confirmar & Promover
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-white">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações de Usuário</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(profile.id)}>
                        Copiar ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>Alterar Cargo</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => updateUserRole(profile.id, 'participant')}>
                        Tornar Usuário Padrão
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handlePromoteToInterpreter} className="text-blue-400">
                        Tornar Intérprete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateUserRole(profile.id, 'admin')} className="text-orange-500">
                        Tornar Admin
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>Governança</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setOpenLimits(true)} className="text-[#06b6d4]">
                        <Settings2 className="h-4 w-4 mr-2" />
                        Editar Limites
                    </DropdownMenuItem>
                    {profile.role === 'interpreter' && (
                        <DropdownMenuItem onClick={() => setOpenLang(true)} className="text-[#06b6d4]">
                            <Languages className="h-4 w-4 mr-2" />
                            Editar Idiomas
                        </DropdownMenuItem>
                    )}
                    {status !== 'active' && (
                        <DropdownMenuItem onClick={() => updateUserStatus(profile.id, 'active')} className="text-green-500">
                            Ativar Usuário
                        </DropdownMenuItem>
                    )}
                    {status !== 'suspended' && (
                        <DropdownMenuItem onClick={() => updateUserStatus(profile.id, 'suspended')} className="text-yellow-500">
                            Suspender Usuário
                        </DropdownMenuItem>
                    )}
                    {status !== 'banned' && (
                        <DropdownMenuItem onClick={() => updateUserStatus(profile.id, 'banned')} className="text-red-500 font-bold">
                            Banir Usuário
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
