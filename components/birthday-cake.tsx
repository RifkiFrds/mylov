"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Cake, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"

export function BirthdayCake() {
  const [showCake, setShowCake] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)

  // Function to handle the cake reveal with animations
  const revealCake = () => {
    // First show sparkles
    setShowSparkles(true)

    // Trigger confetti
    const duration = 3 * 1000
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

    // Play sound effect with error handling
    try {
      const audio = new Audio("/api/audio-placeholder")
      audio.play().catch((err) => {
        console.log("Failed to play celebration sound:", err)
      })
    } catch (error) {
      console.log("Error creating audio:", error)
    }

    // After sparkles animation, show the cake
    setTimeout(() => {
      setShowSparkles(false)
      setShowCake(true)

      // Clean up interval after duration
      clearInterval(interval)
    }, 2000)
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-pink-100 to-purple-100 shadow-lg">
      <div className="flex h-full flex-col items-center justify-center p-4">
        {!showCake && !showSparkles ? (
          // Empty state - just show the button
          <div className="flex flex-col items-center justify-center w-full">
            <motion.h3
              className="mb-6 text-center text-2xl font-bold text-pink-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Ready to see your birthday cake?
            </motion.h3>

            <Button
              onClick={revealCake}
              className="rounded-full bg-pink-500 px-6 py-2 font-semibold text-white hover:bg-pink-600 z-10"
            >
              <Cake className="mr-2 h-5 w-5" /> See Your Birthday Cake
            </Button>
          </div>
        ) : showSparkles ? (
          // Sparkles animation
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Multiple sparkle elements */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    backgroundColor: ["#FFD700", "#FFA500", "#FF69B4", "#00BFFF"][Math.floor(Math.random() * 4)],
                    borderRadius: "50%",
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [0, Math.random() * -50 - 20],
                    x: [0, (Math.random() - 0.5) * 100],
                  }}
                  transition={{
                    duration: Math.random() * 1 + 1,
                    ease: "easeOut",
                  }}
                />
              ))}
              <Sparkles className="mx-auto h-12 w-12 text-yellow-400" />
              <h3 className="mt-4 text-2xl font-bold text-pink-500">Preparing your surprise...</h3>
            </motion.div>
          </div>
        ) : (
          // Cake reveal - responsive layout with no overlapping
          <div className="flex w-full flex-col items-center justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%2014.16.44-OIpbCVJNEP5hRoOMEPCa6CSgUom3Db.jpeg"
                alt="Happy Birthday Mayly"
                className="h-auto w-full rounded-lg object-cover shadow-lg"
              />

              {/* Decorative elements */}
              <motion.div
                className="absolute -right-2 -top-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6 text-pink-400" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center px-4"
            >
              <h3 className="mb-4 text-2xl font-bold text-pink-600">20 years of your beautiful journey!</h3>
                <p className="text-lg text-pink-500">
                 As you turn 20, may God bless every step you take, keep you healthy in body and soul, and guide you as you chase your dreams.
                </p>

              <motion.div
                className="mt-6 flex justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Cake className="h-8 w-8 text-pink-500" />
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
