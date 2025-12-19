import { MessageSquare, Hammer } from 'lucide-react'

export default function MessagesPage() {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
            <div className="bg-accent/20 p-6 rounded-full mb-6">
                <MessageSquare className="h-12 w-12 text-[#06b6d4]" />
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Mensagens</h1>
            <p className="text-muted-foreground max-w-md mb-8 text-lg">
                Sua caixa de entrada unificada para comunicações da plataforma.
            </p>

            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 text-yellow-600 rounded-lg border border-yellow-500/20 text-sm font-medium">
                <Hammer className="h-4 w-4" />
                Funcionalidade em desenvolvimento
            </div>
        </div>
    )
}
