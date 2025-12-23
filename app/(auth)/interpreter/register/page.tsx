'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, Loader2, Mic2 } from 'lucide-react'
import { Logo } from '@/components/logo'

export default function InterpreterRegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const supabase = createClient()

        // Create user with explicit 'interpreter' role metadata
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    role: 'interpreter' // Critical: Set role to interpreter
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            // Check if email confirmation is required (Supabase setting dependent)
            // But for now assume immediate login or "Check email"
            // For simplicity in this dev environment, we assume auto-login or redirect
            router.push('/dashboard?welcome=interpreter')
            router.refresh()
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020817] p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-50 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="w-full max-w-md space-y-8 relative z-10 bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-purple-500/20 shadow-2xl">
                <div className="text-center flex flex-col items-center">
                    <div className="h-12 w-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 border border-purple-500/30">
                        <Mic2 className="h-6 w-6 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Junte-se como Intérprete</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Crie sua conta profissional
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-gray-300">Nome Completo</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 mt-1 focus:ring-purple-500/50 focus:border-purple-500/50"
                                placeholder="Seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-gray-300">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 mt-1 focus:ring-purple-500/50 focus:border-purple-500/50"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-gray-300">Senha</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 mt-1 focus:ring-purple-500/50 focus:border-purple-500/50"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-500 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Criar Conta'}
                    </Button>

                    <p className="text-xs text-center text-gray-500">
                        Já tem uma conta? <Link href="/interpreter/login" className="text-purple-400 hover:text-purple-300">Faça login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
