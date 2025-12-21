
'use client'

import { useLanguage } from './providers/language-provider'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Check, Globe } from 'lucide-react'

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()

    const map = {
        pt: { flag: '🇧🇷', label: 'Português' },
        en: { flag: '🇺🇸', label: 'English' },
        es: { flag: '🇪🇸', label: 'Español' },
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                    <span className="text-lg leading-none">{map[language].flag}</span>
                    <span className="sr-only">Mudar idioma</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('pt')}>
                    <span className="mr-2">🇧🇷</span> Português
                    {language === 'pt' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                    <span className="mr-2">🇺🇸</span> English
                    {language === 'en' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('es')}>
                    <span className="mr-2">🇪🇸</span> Español
                    {language === 'es' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
