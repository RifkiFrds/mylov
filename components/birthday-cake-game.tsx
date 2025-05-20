"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Cake, Sparkles, Heart } from "lucide-react"
import confetti from "canvas-confetti"

export function BirthdayCakeGame() {
  // State untuk mengontrol tampilan dan interaksi kue ulang tahun
  const [showCake, setShowCake] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  // Function to handle the cake reveal with animations
  const startCakeSurprise = () => {
    setShowSparkles(true)

    // Enhanced confetti with multiple colors and shapes
    const colors = ["#ff9ff3", "#a3a1ff", "#ffdda1", "#74dbef", "#ff6b6b", "#ffcc00", "#ff66cc"]

    // First confetti burst - center
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6, x: 0.5 },
      colors: colors,
      shapes: ["circle", "square"],
      scalar: 1.2,
    })

    // Second confetti burst - left side
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 70,
        origin: { y: 0.6, x: 0.3 },
        colors: colors,
      })
    }, 300)

    // Third confetti burst - right side
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 70,
        origin: { y: 0.6, x: 0.7 },
        colors: colors,
      })
    }, 600)

    // Play sound effect with error handling
    try {
      const audio = new Audio("/api/audio-placeholder")
      audio.play().catch((err) => {
        console.log("Failed to play celebration sound:", err)
      })
    } catch (error) {
      console.log("Error creating audio:", error)
    }

    // After sparkles effect, show the cake
    setTimeout(() => {
      setShowSparkles(false)
      setShowCake(true)

      // Show birthday message after a short delay
      setTimeout(() => {
        setShowMessage(true)
      }, 1000)
    }, 2500)
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-pink-100 to-purple-100 shadow-lg">
      <div className="flex h-full flex-col items-center justify-center p-4">
        {!showCake && !showSparkles ? (
          // Initial state - just show the button
          <div className="flex flex-col items-center justify-center w-full">
            <motion.h3
              className="mb-6 text-center text-2xl font-bold text-pink-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Selamat Ulang Tahun!
            </motion.h3>

            <Button
              onClick={startCakeSurprise}
              className="rounded-full bg-pink-500 px-6 py-2 font-semibold text-white hover:bg-pink-600 z-10"
            >
              <Cake className="mr-2 h-5 w-5" /> Lihat Kue Ulang Tahunmu
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
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 12 + 4}px`,
                    height: `${Math.random() * 12 + 4}px`,
                    backgroundColor: [
                      "#FFD700",
                      "#FFA500",
                      "#FF69B4",
                      "#00BFFF",
                      "#FF1493",
                      "#9370DB",
                      "#32CD32",
                      "#FF6347",
                    ][Math.floor(Math.random() * 8)],
                    borderRadius: Math.random() > 0.7 ? "50%" : "0%",
                    rotate: `${Math.random() * 360}deg`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [0, Math.random() * -70 - 30],
                    x: [0, (Math.random() - 0.5) * 120],
                    rotate: [`${Math.random() * 360}deg`, `${Math.random() * 720}deg`],
                  }}
                  transition={{
                    duration: Math.random() * 1.5 + 1,
                    ease: "easeOut",
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}

              {/* Add floating hearts */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  className="absolute text-pink-400"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 20 + 15}px`,
                  }}
                  animate={{
                    y: [0, -100],
                    x: [0, (Math.random() - 0.5) * 50],
                    rotate: [0, Math.random() * 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 2,
                    ease: "easeOut",
                    delay: Math.random() * 0.5,
                  }}
                >
                  ❤️
                </motion.div>
              ))}

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Sparkles className="mx-auto h-16 w-16 text-yellow-400" />
              </motion.div>

              <motion.h3
                className="mt-4 text-3xl font-bold text-pink-500"
                animate={{
                  scale: [1, 1.1, 1],
                  color: ["#ec4899", "#d946ef", "#ec4899"],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Selamat Ulang Tahun!
              </motion.h3>

              <motion.p
                className="mt-2 text-pink-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Kejutan spesial untukmu! ✨
              </motion.p>
            </motion.div>
          </div>
        ) : (
          // Cake display - with birthday cake image
          <div className="flex w-full flex-col items-center justify-center">
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <div className="relative mx-auto w-full max-w-[220px]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cake-removebg-preview-SRpbi16woHQrsFwK0A6HXLzPols16d.png"
                  alt="Birthday Cake with 20 candles"
                  className="h-auto w-full object-contain"
                />

                {/* Decorative sparkles */}
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
              </div>
            </motion.div>

            {/* Birthday message */}
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
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
                  <Heart className="h-8 w-8 text-pink-500" />
                </motion.div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
