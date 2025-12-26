'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Video, Mic, Globe, MessageSquare, Monitor, FileText } from 'lucide-react'

export default function HelpPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Central de Ajuda</h1>
                <p className="text-slate-500 dark:text-slate-400">Tire suas dúvidas e aprenda a usar a plataforma.</p>
            </div>

            <Tabs defaultValue="user" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 h-12 rounded-xl bg-slate-100 dark:bg-slate-800/50 p-1">
                    <TabsTrigger value="user" className="rounded-lg font-bold">Para Usuários</TabsTrigger>
                    <TabsTrigger value="interpreter" className="rounded-lg font-bold">Para Intérpretes</TabsTrigger>
                </TabsList>

                {/* User Guide */}
                <TabsContent value="user">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Getting Started */}
                        <Card className="md:col-span-2 bg-white dark:bg-card border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Video className="h-5 w-5 text-blue-500" />
                                    Como participar de reuniões
                                </CardTitle>
                                <CardDescription>Guia básico para entrar e interagir</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Como entro em uma reunião?</AccordionTrigger>
                                        <AccordionContent>
                                            Você pode entrar clicando no link compartilhado pelo organizador ou inserindo o ID da reunião na página inicial após fazer login.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Como ouço a tradução?</AccordionTrigger>
                                        <AccordionContent>
                                            Dentro da sala, clique no ícone de "Mundo" (🌐) ou no menu de idiomas na barra inferior. Selecione o idioma que deseja ouvir. O áudio original será baixado automaticamente e você ouvirá o intérprete.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Posso falar durante a tradução?</AccordionTrigger>
                                        <AccordionContent>
                                            Sim! Você pode abrir seu microfone a qualquer momento. Se houver tradução simultânea, o intérprete ouvirá você e traduzirá para os outros participantes.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>

                        {/* Features */}
                        <Card className="bg-white dark:bg-card border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-purple-500" />
                                    Chat e Reações
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>O chat é traduzido?</AccordionTrigger>
                                        <AccordionContent>
                                            Atualmente o chat é universal. Recomendamos escrever no idioma comum ou usar ferramentas de tradução externa por enquanto. (Tradução automática de chat em breve!)
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Como levantar a mão?</AccordionTrigger>
                                        <AccordionContent>
                                            Clique no ícone de "Mão" (✋) na barra de controles. Isso notificará o anfitrião e os intérpretes que você deseja falar.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-card border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Monitor className="h-5 w-5 text-green-500" />
                                    Compartilhamento
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Como compartilhar tela?</AccordionTrigger>
                                        <AccordionContent>
                                            Clique no botão "Compartilhar Tela" na barra inferior. Você pode escolher compartilhar a tela inteira, uma janela ou uma guia do navegador. Se compartilhar uma guia com vídeo, lembre-se de marcar "Compartilhar áudio da guia".
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Interpreter Guide */}
                <TabsContent value="interpreter">
                    <Card className="bg-white dark:bg-card border-none shadow-sm mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-amber-500">
                                <Globe className="h-5 w-5" />
                                Console do Intérprete
                            </CardTitle>
                            <CardDescription>Domine sua ferramenta de trabalho</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="prose dark:prose-invert max-w-none mb-6">
                                <p>
                                    Como intérprete, você tem acesso a um painel exclusivo (Console). Ele aparece automaticamente quando você entra em uma sala onde foi designado como intérprete.
                                </p>
                            </div>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Não vejo o console. O que fazer?</AccordionTrigger>
                                    <AccordionContent>
                                        1. Verifique se você está logado com a conta correta.<br />
                                        2. Confirme se o anfitrião adicionou seu email na lista de intérpretes da reunião.<br />
                                        3. Tente recarregar a página. Se o problema persistir, peça ao admin para verificar seu cargo.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Como mudar o canal de saída?</AccordionTrigger>
                                    <AccordionContent>
                                        No seu console, use os botões de idioma (ex: PT, EN) para alternar para qual canal sua voz está sendo enviada. O botão ativo ficará iluminado.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>O que é o botão "Handover" (🔄)?</AccordionTrigger>
                                    <AccordionContent>
                                        Use este botão para sinalizar ao seu parceiro de cabine (outro intérprete do mesmo idioma) que você deseja trocar de turno. Ele enviará um emoji visual na tela.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>

                    <div className="bg-slate-900 rounded-2xl p-6 text-white">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Mic className="h-5 w-5 text-red-500" />
                            Boas Práticas
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-slate-300">
                            <li>Use sempre fones de ouvido com microfone de boa qualidade (headset USB recomendado).</li>
                            <li>Mantenha-se no "Mudo" quando não estiver interpretando ativamente.</li>
                            <li>Tenha uma conexão de internet cabeada (Ethernet) para maior estabilidade.</li>
                            <li>Feche abas desnecessárias do navegador para economizar processamento.</li>
                        </ul>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
