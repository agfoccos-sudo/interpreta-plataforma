'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Megaphone, Plus, Trash2, Send } from 'lucide-react'
import { createAnnouncement } from '@/app/admin/actions'
import { createClient } from '@/lib/supabase/client'
import { useEffect } from 'react'

export default function AdminMessagesPage() {
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<any[]>([])

    useEffect(() => {
        const fetchMessages = async () => {
            const supabase = createClient()
            const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false })
            if (data) setMessages(data)
        }
        fetchMessages()
    }, [loading])

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await createAnnouncement(formData)
        if (!result.success) {
            alert(result.error)
        } else {
            alert('Comunicado enviado com sucesso!')
            // Ideally reset form here
        }
        setLoading(false)
    }

    return (
        <div className="space-y-6 pt-8 px-8">
            <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
                <Megaphone className="h-8 w-8 text-primary" />
                Comunicados Globais
            </h1>
            <p className="text-muted-foreground">Envie mensagens importantes para todos os usuários da plataforma.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Form */}
                <Card className="lg:col-span-1 bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">Novo Comunicado</CardTitle>
                        <CardDescription>Aparecerá no painel de todos os usuários.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-card-foreground">Título</Label>
                                <Input name="title" id="title" placeholder="Ex: Manutenção Programada" className="bg-background border-input text-foreground" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-card-foreground">Mensagem</Label>
                                <Textarea name="content" id="content" placeholder="Detalhes do aviso..." className="bg-background border-input text-foreground min-h-[150px]" required />
                            </div>
                            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 font-bold text-primary-foreground">
                                {loading ? 'Enviando...' : 'Publicar Agora'} <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* List */}
                <Card className="lg:col-span-2 bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">Histórico de Envios</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {messages.length === 0 ? (
                            <p className="text-muted-foreground text-sm italic">Nenhum comunicado enviado ainda.</p>
                        ) : (
                            messages.map(msg => (
                                <div key={msg.id} className="p-4 rounded-xl bg-muted/30 border border-border flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-foreground text-lg">{msg.title}</h4>
                                        <p className="text-muted-foreground text-sm mt-1 whitespace-pre-wrap">{msg.content}</p>
                                        <span className="text-xs text-muted-foreground/70 mt-3 block">
                                            Enviado em {new Date(msg.created_at).toLocaleDateString()} às {new Date(msg.created_at).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
