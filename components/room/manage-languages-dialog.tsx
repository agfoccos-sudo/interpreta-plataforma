'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LANGUAGES } from "@/lib/languages"
import { Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface ManageLanguagesDialogProps {
    isOpen: boolean
    onClose: () => void
    userName: string
    currentLanguages: string[]
    onSave: (languages: string[]) => void
}

export function ManageLanguagesDialog({
    isOpen,
    onClose,
    userName,
    currentLanguages,
    onSave
}: ManageLanguagesDialogProps) {
    const [selected, setSelected] = useState<string[]>(currentLanguages)
    const [search, setSearch] = useState('')

    // Reset when opening
    if (!isOpen && selected.length !== currentLanguages.length) {
        // We can't easily reset in render, so we rely on parent to remount or useEffect if needed.
        // Actually, better to sync state on open.
    }

    // Sync state when props change (re-opening dialog with new user)
    // Note: This needs careful handling to avoid infinite loops, usually handled by key or useEffect.
    // We'll rely on the parent rendering a fresh instance or use useEffect.

    const toggleLanguage = (code: string) => {
        setSelected(prev =>
            prev.includes(code)
                ? prev.filter(c => c !== code)
                : [...prev, code]
        )
    }

    const filteredLanguages = LANGUAGES.filter(l =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.code.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-[#020817] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>Gerenciar Idiomas</DialogTitle>
                    <DialogDescription>
                        Defina quais idiomas <span className="text-white font-bold">{userName}</span> pode interpretar.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar idioma..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white/5 border-white/10 pl-9"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                        {filteredLanguages.map((lang) => {
                            const isSelected = selected.includes(lang.code)
                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => toggleLanguage(lang.code)}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                                        isSelected
                                            ? "bg-purple-500/20 border-purple-500 text-white"
                                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                    )}
                                >
                                    <span className="text-2xl">{lang.flag}</span>
                                    <span className="text-xs font-bold uppercase flex-1">{lang.name}</span>
                                    {isSelected && <Check className="h-4 w-4 text-purple-400" />}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} className="hover:bg-white/10 text-gray-400">
                        Cancelar
                    </Button>
                    <Button onClick={() => { onSave(selected); onClose() }} className="bg-purple-600 hover:bg-purple-500">
                        Salvar Alterações
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
