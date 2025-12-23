'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, Loader2, Languages } from 'lucide-react'
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

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/dashboard')
            router.refresh()
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020817] p-4 relative overflow-hidden">
            {/* Background patterns specific to interpreters */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-50 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute top-10 right-10 opacity-20 animate-pulse">
                <Languages className="h-24 w-24 text-purple-500" />
            </div>

            <div className="w-full max-w-md space-y-8 relative z-10 bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-900/10">
                <div className="text-center flex flex-col items-center">
                    <Logo className="scale-125 mb-2" />
                    <div className="bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full mt-2">
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Portal do Intérprete</span>
                    </div>
                    <p className="mt-4 text-sm text-gray-400">
                        Acesse sua cabine virtual
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
                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 mt-1 focus:ring-purple-500/50 focus:border-purple-500/50"
                                placeholder="nome@agencia.com"
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
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Acessar Cabine'}
                    </Button>

                    <div className="text-center space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#020817] px-2 text-gray-500">Novo por aqui?</span>
                            </div>
                        </div>

                        <Link
                            href="/interpreter/register"
                            className="block w-full text-center text-sm text-purple-400 hover:text-purple-300 font-medium"
                        >
                            Criar conta de Intérprete
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
