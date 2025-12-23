'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, Loader2, Globe, ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/logo'
import { useLanguage } from '@/components/providers/language-provider'

// Available languages for selection
const AVAILABLE_LANGUAGES = [
    { id: 'pt', label: 'Português' },
    { id: 'en', label: 'Inglês' },
    { id: 'es', label: 'Espanhol' },
    { id: 'fr', label: 'Francês' },
    { id: 'de', label: 'Alemão' },
    { id: 'it', label: 'Italiano' },
    { id: 'zh', label: 'Chinês' },
    { id: 'ja', label: 'Japonês' },
]

export default function InterpreterRegisterPage() {
    const { t } = useLanguage()
    const router = useRouter()

    // Form State
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [company, setCompany] = useState('')
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

    // UI State
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const toggleLanguage = (langId: string) => {
        setSelectedLanguages(prev =>
            prev.includes(langId)
                ? prev.filter(id => id !== langId)
                : [...prev, langId]
        )
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // Validation
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.')
            setLoading(false)
            return
        }

        if (selectedLanguages.length === 0) {
            setError('Selecione pelo menos um idioma.')
            setLoading(false)
            return
        }

        const supabase = createClient()

        try {
            // 1. Sign Up
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        role: 'interpreter', // AUTO-ASSIGN ROLE
                        company: company,
                        languages: selectedLanguages
                    }
                }
            })

            if (authError) throw authError

            // 2. Create Profile (if not handled by trigger, but let's assume manual creation for robustness or reliability if trigger fails/doesn't exist)
            // Ideally, a Supabase trigger handles this. But for safety, we can try to insert/update if the trigger is slow or doesn't exist.
            // However, usually we rely on metadata + trigger. 
            // Let's assume the metadata `role: 'interpreter'` is the key.

            // If the user already exists (might happen in dev), we confuse it. 
            // Let's assume fresh registration.

            if (authData.user) {
                // Determine redirect
                router.push('/dashboard')
            }
        } catch (err: any) {
            setError(err.message || 'Erro ao criar conta.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020817] p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="w-full max-w-xl space-y-8 relative z-10 bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center flex flex-col items-center">
                    <Logo className="scale-125 mb-4" />
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Globe className="text-cyan-400" />
                        Cadastro de Intérprete
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Junte-se à nossa rede de profissionais de interpretação.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="space-y-4">
                        {/* Name */}
                        <div>
                            <Label htmlFor="fullname" className="text-gray-300">Nome Completo</Label>
                            <Input
                                id="fullname"
                                required
                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 mt-1"
                                placeholder="João Silva"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email" className="text-gray-300">Email Profissional</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 mt-1"
                                placeholder="joao@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Company */}
                        <div>
                            <Label htmlFor="company" className="text-gray-300">Empresa / Agência (Opcional)</Label>
                            <Input
                                id="company"
                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 mt-1"
                                placeholder="Ex: Interpret Solutions Ltda"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>

                        {/* Languages */}
                        <div>
                            <Label className="text-gray-300 block mb-2">Idiomas de Trabalho</Label>
                            <div className="grid grid-cols-2 gap-3 p-4 bg-black/20 rounded-lg border border-white/10">
                                {AVAILABLE_LANGUAGES.map((lang) => (
                                    <div key={lang.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`lang-${lang.id}`}
                                            checked={selectedLanguages.includes(lang.id)}
                                            onCheckedChange={() => toggleLanguage(lang.id)}
                                            className="border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                                        />
                                        <Label
                                            htmlFor={`lang-${lang.id}`}
                                            className="text-gray-400 cursor-pointer hover:text-white transition-colors"
                                        >
                                            {lang.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="password" className="text-gray-300">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 mt-1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="confirmPassword" className="text-gray-300">Confirmar Senha</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 mt-1"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-500 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-4 pt-2">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-6 text-lg shadow-lg shadow-cyan-500/20"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Criar Conta de Intérprete'}
                        </Button>

                        <div className="flex justify-between items-center text-sm">
                            <Link href="/interpreter/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                                Já tem conta? Entrar
                            </Link>
                            <Link href="/login" className="text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors">
                                <ArrowLeft className="w-3 h-3" /> Voltar ao Login Geral
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
