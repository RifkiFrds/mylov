"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, RefreshCw } from "lucide-react"

// Love reasons data
const loveReasons = [
  "Kamu adalah orang baik!",
  "Kamu adalah wanita mandiri!",
  "Kamu selalu jadi alasan aku semangat jalani hidup — dari proses belajar sampai sukses di masa depan nanti!",
  "Aku percaya sama kamu, because when our souls met, even the universe smiled.",
  "Kamu beda dari wanita lain, dari semua perspektif manapun!",
  "Wibu premium 😎😭",
  "Tidak sombong, rajin menabung ☝️",
  "Kamu suka bantu orang lain tanpa pamrih — that’s rare!",
  "Attitude kamu it’s the best!",
  "Karena aku cinta kamu, no reason needed. Just love. 🤍",
];

export function LoveReasons() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const getNextReason = () => {
    const nextIndex = (currentIndex + 1) % loveReasons.length
    setDirection(1)
    setCurrentIndex(nextIndex)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      {/* Generator alasan mengapa aku mencintaimu */}
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-pink-500">Why I Love You</h3>
        <p className="text-sm text-gray-600">Discover all the reasons why you're special to me</p>
      </div>

      <div className="relative h-40 overflow-hidden rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 p-4">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            className="absolute inset-0 flex items-center justify-center p-6 text-center"
          >
            <div>
              <Heart className="mx-auto mb-3 h-8 w-8 text-pink-400" />
              <p className="text-lg font-medium text-pink-600">{loveReasons[currentIndex]}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          onClick={getNextReason}
          className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-2 font-semibold text-white transition-all hover:shadow-lg"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Next Reason
        </Button>
      </div>
    </div>
  )
}
