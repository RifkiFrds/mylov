"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Gift, Heart, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"

export function GiftReveal() {
  const [isOpen, setIsOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleOpenGift = () => {
    setIsOpen(true)

    // Play jingle sound
    try {
      const audio = new Audio("/api/audio-placeholder")
      audio.volume = 0.5
      audio.play().catch((err) => {
        console.log("Failed to play gift sound:", err)
      })
      audioRef.current = audio
    } catch (error) {
      console.log("Error creating audio:", error)
    }

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

    // Clean up interval after duration
    setTimeout(() => {
      clearInterval(interval)
    }, duration)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-lg">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="gift-closed"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-pink-300 to-purple-300"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 rgba(244, 114, 182, 0.4)",
                  "0 0 20px rgba(244, 114, 182, 0.6)",
                  "0 0 0 rgba(244, 114, 182, 0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Gift className="h-16 w-16 text-white" />
            </motion.div>
            <h3 className="mb-4 text-xl font-bold text-pink-500">A Special Gift For You</h3>
            <Button
              onClick={handleOpenGift}
              className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-2 font-semibold text-white transition-all hover:shadow-lg"
            >
              Open Your Gift
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="gift-open"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="relative mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative h-48 w-48 overflow-hidden rounded-full">
                <img
                  src="/images/bandung.jpg"
                  alt="First Date Memory"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent"></div>
              </div>

              {/* Sparkles around the image */}
              <motion.div
                className="absolute -top-2 -right-2"
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
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="mb-2 text-2xl font-bold text-pink-500">Quality time vibes – in Bandung 💖🍃</h3>
              <p className="mb-4 text-gray-700">
  Momen yang ga akan pernah aku lupain—yes, this is our quality time vibes in Bandung. <br />
  Dari perjalanan naik kereta, seharian rental motor keliling kota Bandung sampai Dago dan Ciwidey, semuanya terasa spesial. 
  ini bukan pertemuan biasa, tapi special date untuk merayakan satu tahun sejak kita pertama kali kenal.
  <br /><br />
  Thank you for taking the time, the energy, and the effort to spend this beautiful quality time with me on our special one-year day
  <br /><br />
  NEXT PAPUA DATE OKEY?!
</p>

              <div className="mt-6 flex justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Heart className="h-10 w-10 text-pink-500" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
