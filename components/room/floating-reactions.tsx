"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Reaction {
    id: string
    emoji: string
    userId: string
}

interface FloatingReactionsProps {
    reactions: Reaction[]
}

export function FloatingReactions({ reactions }: FloatingReactionsProps) {
    // Função simples para gerar um número determinístico a partir da string de ID
    const getSeed = (id: string) => {
        let hash = 0
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash)
        }
        return Math.abs(hash)
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            <AnimatePresence>
                {reactions.map((r) => {
                    const seed = getSeed(r.id)
                    const startX = (seed % 80) + 10 // Entre 10 e 90vw
                    const drift = (seed % 20) - 10 // Entre -10 e 10vw

                    return (
                        <motion.div
                            key={r.id}
                            initial={{ y: '105vh', opacity: 0, x: `${startX}vw`, scale: 0.5 }}
                            animate={{
                                y: '-10vh',
                                opacity: [0, 1, 1, 0],
                                x: [
                                    `${startX}vw`,
                                    `${startX + drift}vw`,
                                    `${startX - drift}vw`,
                                    `${startX + drift / 2}vw`
                                ],
                                scale: [0.5, 1.2, 1, 0.8],
                                rotate: [0, 15, -15, 0]
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 5 + (seed % 3),
                                ease: "linear",
                                times: [0, 0.1, 0.8, 1]
                            }}
                            className="absolute text-6xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] select-none"
                        >
                            {r.emoji}
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}
