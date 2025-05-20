"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

export function Confetti() {
  useEffect(() => {
    // Try to play a celebration sound with error handling
    try {
      const audio = new Audio("/celebration.mp3")
      audio.volume = 0.5
      audio.play().catch((err) => {
        console.log("Failed to play celebration sound:", err)
      })
    } catch (error) {
      console.log("Error creating celebration audio:", error)
    }

    // Create a confetti cannon
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff9ff3", "#a3a1ff", "#ffdda1", "#74dbef", "#ff6b6b"],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff9ff3", "#a3a1ff", "#ffdda1", "#74dbef", "#ff6b6b"],
      })
    }, 250)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return null
}
