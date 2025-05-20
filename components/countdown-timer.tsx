"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type CountdownProps = {
  targetDate: string
}

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // If the target date has passed, show zeros
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    // Clean up on unmount
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 grid grid-cols-4 gap-4">
        {/* Days */}
        <div className="flex flex-col items-center">
          <motion.div
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 text-3xl font-bold text-white shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 rgba(244, 114, 182, 0.4)",
                "0 0 20px rgba(244, 114, 182, 0.6)",
                "0 0 0 rgba(244, 114, 182, 0.4)",
              ],
            }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            {timeLeft.days}
          </motion.div>
          <span className="mt-2 text-sm font-medium text-gray-600">Days</span>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <motion.div
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-blue-400 text-3xl font-bold text-white shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 rgba(168, 85, 247, 0.4)",
                "0 0 20px rgba(168, 85, 247, 0.6)",
                "0 0 0 rgba(168, 85, 247, 0.4)",
              ],
            }}
            transition={{ duration: 1.5, delay: 0.2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            {timeLeft.hours}
          </motion.div>
          <span className="mt-2 text-sm font-medium text-gray-600">Hours</span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <motion.div
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-pink-400 text-3xl font-bold text-white shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 rgba(96, 165, 250, 0.4)",
                "0 0 20px rgba(96, 165, 250, 0.6)",
                "0 0 0 rgba(96, 165, 250, 0.4)",
              ],
            }}
            transition={{ duration: 1.5, delay: 0.4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            {timeLeft.minutes}
          </motion.div>
          <span className="mt-2 text-sm font-medium text-gray-600">Minutes</span>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <motion.div
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-pink-400 text-3xl font-bold text-white shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 rgba(251, 191, 36, 0.4)",
                "0 0 20px rgba(251, 191, 36, 0.6)",
                "0 0 0 rgba(251, 191, 36, 0.4)",
              ],
            }}
            transition={{ duration: 1.5, delay: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            {timeLeft.seconds}
          </motion.div>
          <span className="mt-2 text-sm font-medium text-gray-600">Seconds</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <motion.div
          className="h-8 w-8 rounded-full bg-pink-400"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 0 0 rgba(244, 114, 182, 0.7)",
              "0 0 0 10px rgba(244, 114, 182, 0)",
              "0 0 0 0 rgba(244, 114, 182, 0)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      </div>

      {/* Heartbeat animation */}
      <motion.div
        className="mt-6"
        animate={{
          scale: [1, 1.15, 1, 0.9, 1],
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            fill="#ec4899"
            stroke="#ec4899"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}
