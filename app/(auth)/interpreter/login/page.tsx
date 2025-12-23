'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, Loader2, Globe, ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/logo'

export default function InterpreterLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const supabase = createClient()

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            // Check if user is actually an interpreter
            /* 
            // Note: We could enforce role check here, but standard login usually allows everyone. 
            // We'll rely on dashboard/room logic to show interpreter features.
            const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
            if (profile?.role !== 'interpreter') {
                // Should we block? Maybe just warn. For now let them in.
            }
            */
            router.push('/dashboard')
            router.refresh()
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020817] p-4 relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="w-full max-w-md space-y-8 relative z-10 bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl border-t-cyan-500/50">
                <div className="text-center flex flex-col items-center">
                    <Logo className="scale-150 mb-4" />
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 mb-2">
                        <Globe className="w-3 h-3" />
                        ÁREA DO INTÉRPRETE
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                        Acesse seu painel de interpretação
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="text-gray-300">Email Profissional</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 mt-1"
                                placeholder="interprete@exemplo.com"
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
                                autoComplete="current-password"
                                required
                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 mt-1"
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

                    <div className="space-y-4">
                        <Button
                            type="submit"
                            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 shadow-lg shadow-cyan-900/20"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Entrar como Intérprete'}
                        </Button>

                        <div className="flex justify-between items-center text-sm pt-2">
                            <Link href="/interpreter/register" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                                Cadastrar-se
                            </Link>
                            <Link href="/login" className="text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors">
                                <ArrowLeft className="w-3 h-3" /> Login Padrão
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
