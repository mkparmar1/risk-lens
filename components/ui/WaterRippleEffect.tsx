"use client"

import React, { useEffect, useRef } from "react"

export function WaterRippleEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const ripplesRef = useRef<any[]>([])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", resize)
        resize()

        // Configuration
        const rippleConfig = {
            maxSize: 400, // Much bigger
            expandSpeed: 0.6, // Much slower execution
            fadeSpeed: 0.003, // Fades very slowly so it travels further
            color: "rgba(124, 58, 237, 0.4)",
        }

        const createRipple = (x: number, y: number) => {
            ripplesRef.current.push({
                x,
                y,
                size: 0,
                alpha: 0.5,
            })
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw ripples
            for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
                const ripple = ripplesRef.current[i]

                ripple.size += rippleConfig.expandSpeed
                ripple.alpha -= rippleConfig.fadeSpeed

                if (ripple.alpha <= 0) {
                    ripplesRef.current.splice(i, 1)
                    continue
                }

                ctx.beginPath()
                ctx.arc(ripple.x, ripple.y, ripple.size, 0, Math.PI * 2)
                ctx.closePath()

                // Create gradient for "wave" look
                const gradient = ctx.createRadialGradient(
                    ripple.x, ripple.y, ripple.size * 0.7,
                    ripple.x, ripple.y, ripple.size
                )
                gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
                gradient.addColorStop(0.5, `rgba(124, 58, 237, ${ripple.alpha})`)
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

                ctx.strokeStyle = gradient
                ctx.lineWidth = 2
                ctx.stroke()
            }

            animationFrameId = requestAnimationFrame(draw)
        }

        const handleMouseMove = (e: MouseEvent) => {
            // Limit ripple creation for performance
            if (Math.random() > 0.8) {
                createRipple(e.clientX, e.clientY)
            }
        }

        // Create ripple effect on click too
        const handleClick = (e: MouseEvent) => {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => createRipple(e.clientX, e.clientY), i * 100)
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("click", handleClick)
        draw()

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("click", handleClick)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
            style={{ width: "100%", height: "100%" }}
        />
    )
}
