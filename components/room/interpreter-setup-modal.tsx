'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Lock, Globe, AlertCircle } from "lucide-react"
import type { Language } from "@/lib/languages"

interface InterpreterSetupModalProps {
    isOpen: boolean
    availableLanguages: Language[]
    occupiedLanguages: string[] // Codes of languages already taken
    onSelect: (langCode: string) => void
    userName: string
}

export function InterpreterSetupModal({
    isOpen,
    availableLanguages,
    occupiedLanguages,
    onSelect,
    userName
}: InterpreterSetupModalProps) {
    const [selected, setSelected] = useState<string | null>(null)

    // Reset selection if modal opens/closes
    useEffect(() => {
        if (isOpen) setSelected(null)
    }, [isOpen])

    const handleConfirm = () => {
        if (selected) {
            onSelect(selected)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogContent className="sm:max-w-md bg-[#020817] border-white/10 text-white" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                <DialogHeader className="space-y-4 items-center text-center">
                    <div className="h-16 w-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-2">
                        <Globe className="h-8 w-8 text-purple-400" />
                    </div>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Configuração de Intérprete
                    </DialogTitle>
                    <DialogDescription className="text-gray-400 text-center max-w-[90%] mx-auto">
                        Olá, <span className="text-white font-medium">{userName}</span>. Selecione o canal de idioma que você irá interpretar nesta sessão.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-3 py-6 max-h-[300px] overflow-y-auto custom-scrollbar px-1">
                    {availableLanguages.map((lang) => {
                        const isLocked = occupiedLanguages.includes(lang.code)
                        const isSelected = selected === lang.code

                        return (
                            <button
                                key={lang.code}
                                disabled={isLocked}
                                onClick={() => setSelected(lang.code)}
                                className={cn(
                                    "relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 gap-2 overflow-hidden group",
                                    isSelected
                                        ? "bg-purple-500/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10",
                                    isLocked && "opacity-50 cursor-not-allowed bg-black/40 hover:bg-black/40 border-transparent grayscale"
                                )}
                            >
                                <span className="text-3xl filter drop-shadow-lg">{lang.flag}</span>
                                <span className={cn("text-xs font-bold uppercase tracking-wider", isSelected ? "text-purple-300" : "text-gray-500")}>
                                    {lang.name}
                                </span>

                                {isSelected && (
                                    <div className="absolute top-2 right-2">
                                        <Check className="h-4 w-4 text-purple-400" />
                                    </div>
                                )}

                                {isLocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
                                        <div className="bg-red-500/20 p-2 rounded-full border border-red-500/50">
                                            <Lock className="h-4 w-4 text-red-400" />
                                        </div>
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Info Alert */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex gap-3 text-xs text-blue-300 mb-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <p>
                        Apenas um intérprete é permitido por canal. Canais ocupados estão bloqueados.
                    </p>
                </div>

                <DialogFooter className="sm:justify-center">
                    <Button
                        onClick={handleConfirm}
                        disabled={!selected}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:shadow-none"
                    >
                        Confirmar e Entrar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
