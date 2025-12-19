'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export function ExportButton() {
    const handleExport = () => {
        // Mock CSV download
        const data = [
            ['Data', 'Reuniao', 'Participantes', 'Duracao'],
            ['2025-12-19', 'Reuniao Geral', '12', '45min'],
            ['2025-12-18', 'Onboarding', '5', '30min'],
        ]

        const csvContent = "data:text/csv;charset=utf-8,"
            + data.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "relatorio_plataforma.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Could also use a Toast here if Toast component is available
        alert('Relatório baixado com sucesso!')
    }

    return (
        <Button
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5"
            onClick={handleExport}
        >
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
        </Button>
    )
}
