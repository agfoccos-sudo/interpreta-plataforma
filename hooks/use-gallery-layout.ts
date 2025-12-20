import { useState, useEffect, useCallback, RefObject } from 'react'

interface LayoutParams {
    width: number
    height: number
    cols: number
    rows: number
    count: number
}

export function useGalleryLayout(containerRef: RefObject<HTMLElement | null>, participantCount: number) {
    const [layout, setLayout] = useState<LayoutParams>({ width: 0, height: 0, cols: 1, rows: 1, count: 0 })

    const calculateLayout = useCallback(() => {
        if (!containerRef.current || participantCount === 0) return

        const { clientWidth: containerWidth, clientHeight: containerHeight } = containerRef.current
        const ratio = 16 / 9

        let bestWidth = 0
        let bestHeight = 0
        let bestCols = 1
        let bestRows = 1

        // Brute force search for best grid configuration
        for (let cols = 1; cols <= participantCount; cols++) {
            const rows = Math.ceil(participantCount / cols)

            // Calculate max possible width/height for this configuration
            let w = containerWidth / cols
            let h = w / ratio

            // If height exceeds space, scale down based on rows
            if (h * rows > containerHeight) {
                h = containerHeight / rows
                w = h * ratio
            }

            // We want the largest possible area
            if (w > bestWidth) {
                bestWidth = w
                bestHeight = h
                bestCols = cols
                bestRows = rows
            }
        }

        setLayout({
            width: Math.floor(bestWidth - 8), // Padding allowance
            height: Math.floor(bestHeight - 8),
            cols: bestCols,
            rows: bestRows,
            count: participantCount
        })
    }, [participantCount, containerRef])

    useEffect(() => {
        calculateLayout()
        window.addEventListener('resize', calculateLayout)
        return () => window.removeEventListener('resize', calculateLayout)
    }, [calculateLayout])

    return layout
}
