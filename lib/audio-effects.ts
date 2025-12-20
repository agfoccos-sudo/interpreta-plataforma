"use client"

export function playNotificationSound() {
    if (typeof window === 'undefined') return

    try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioCtx.createOscillator()
        const gainNode = audioCtx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioCtx.destination)

        // Som de "Ding" suave
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime) // C5
        oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.1) // C6

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
        gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5)

        oscillator.start(audioCtx.currentTime)
        oscillator.stop(audioCtx.currentTime + 0.5)

        setTimeout(() => {
            audioCtx.close()
        }, 600)
    } catch (err) {
        console.warn("Could not play notification sound:", err)
    }
}
