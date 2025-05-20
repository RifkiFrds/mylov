"use client"

import { useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Gift } from "lucide-react"

// Dice faces
const diceFaces = [
  {
    id: 1,
    text: "Hug Coupon",
    icon: "🤗",
    color: "#FF9FF3",
    description: "Redeemable for a warm, loving hug anytime!",
  },
  {
    id: 2,
    text: "Love Letter",
    icon: "💌",
    color: "#A3A1FF",
    description: "A heartfelt letter expressing my feelings for you.",
  },
  {
    id: 3,
    text: "Picnic Date",
    icon: "🧺",
    color: "#FFDDA1",
    description: "A romantic picnic under the stars, just for us.",
  },
  { id: 4, text: "Virtual Kiss", icon: "💋", color: "#FF6B6B", description: "Sending you kisses across the distance." },
  {
    id: 5,
    text: "Movie Night",
    icon: "🎬",
    color: "#74DBEF",
    description: "Your choice of movie and snacks, my treat!",
  },
  {
    id: 6,
    text: "Surprise Gift",
    icon: "🎁",
    color: "#D3B5E5",
    description: "A special surprise coming your way soon!",
  },
]

export function LoveDice() {
  const [rolling, setRolling] = useState(false)
  const [result, setResult] = useState<(typeof diceFaces)[0] | null>(null)
  const [showResult, setShowResult] = useState(false)
  const diceRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const rollDice = async () => {
    if (rolling) return

    setRolling(true)
    setShowResult(false)

    // Random dice face
    const randomFace = Math.floor(Math.random() * 6)

    // Animate dice rolling
    await controls.start({
      rotateX: Math.floor(Math.random() * 10) * 360 + [0, 90, 180, 270][Math.floor(Math.random() * 4)],
      rotateY: Math.floor(Math.random() * 10) * 360 + [0, 90, 180, 270][Math.floor(Math.random() * 4)],
      rotateZ: Math.floor(Math.random() * 10) * 360,
      transition: { duration: 2, type: "spring", bounce: 0.2 },
    })

    // Set final rotation based on the selected face
    let finalRotation = { rotateX: 0, rotateY: 0, rotateZ: 0 }

    switch (randomFace) {
      case 0: // Front face
        finalRotation = { rotateX: 0, rotateY: 0, rotateZ: 0 }
        break
      case 1: // Back face
        finalRotation = { rotateX: 180, rotateY: 0, rotateZ: 0 }
        break
      case 2: // Right face
        finalRotation = { rotateX: 0, rotateY: 90, rotateZ: 0 }
        break
      case 3: // Left face
        finalRotation = { rotateX: 0, rotateY: -90, rotateZ: 0 }
        break
      case 4: // Top face
        finalRotation = { rotateX: 90, rotateY: 0, rotateZ: 0 }
        break
      case 5: // Bottom face
        finalRotation = { rotateX: -90, rotateY: 0, rotateZ: 0 }
        break
    }

    await controls.start({
      ...finalRotation,
      transition: { duration: 1, type: "spring", bounce: 0.2 },
    })

    // Show result
    setResult(diceFaces[randomFace])
    setShowResult(true)
    setRolling(false)

    // Play sound effect with error handling
    try {
      const audio = new Audio("/api/audio-placeholder")
      audio.play().catch((err) => {
        console.log("Failed to play dice sound:", err)
      })
    } catch (error) {
      console.log("Error creating audio:", error)
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      {/* Bahasa Indonesia comment */}
      {/* Dadu cinta untuk hadiah romantis */}
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-pink-500">Love Dice</h3>
        <p className="text-sm text-gray-600">Roll the dice for a romantic surprise!</p>
      </div>

      <div className="flex flex-col items-center">
        {/* 3D Dice */}
        <div className="relative mb-8 h-48 w-48 perspective-[800px]">
          <motion.div
            ref={diceRef}
            className="absolute h-full w-full transform-style-3d"
            animate={controls}
            initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-pink-200 bg-gradient-to-br from-pink-100 to-pink-200 backface-hidden"
              style={{ transform: "translateZ(4rem)" }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl">{diceFaces[0].icon}</span>
                <span className="mt-2 text-sm font-bold text-pink-600">{diceFaces[0].text}</span>
              </div>
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-purple-200 backface-hidden"
              style={{ transform: "rotateY(180deg) translateZ(4rem)" }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl">{diceFaces[1].icon}</span>
                <span className="mt-2 text-sm font-bold text-purple-600">{diceFaces[1].text}</span>
              </div>
            </div>

            {/* Right face */}
            <div
              className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-100 to-blue-200 backface-hidden"
              style={{ transform: "rotateY(90deg) translateZ(4rem)" }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl">{diceFaces[2].icon}</span>
                <span className="mt-2 text-sm font-bold text-blue-600">{diceFaces[2].text}</span>
              </div>
            </div>

            {/* Left face */}
            <div
              className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-yellow-200 bg-gradient-to-br from-yellow-100 to-yellow-200 backface-hidden"
              style={{ transform: "rotateY(-90deg) translateZ(4rem)" }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl">{diceFaces[3].icon}</span>
                <span className="mt-2 text-sm font-bold text-yellow-600">{diceFaces[3].text}</span>
              </div>
            </div>

            {/* Top face */}
            <div
              className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-red-200 bg-gradient-to-br from-red-100 to-red-200 backface-hidden"
              style={{ transform: "rotateX(90deg) translateZ(4rem)" }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl">{diceFaces[4].icon}</span>
                <span className="mt-2 text-sm font-bold text-red-600">{diceFaces[4].text}</span>
              </div>
            </div>

            {/* Bottom face */}
            <div
              className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-green-200 bg-gradient-to-br from-green-100 to-green-200 backface-hidden"
              style={{ transform: "rotateX(-90deg) translateZ(4rem)" }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl">{diceFaces[5].icon}</span>
                <span className="mt-2 text-sm font-bold text-green-600">{diceFaces[5].text}</span>
              </div>
            </div>
          </motion.div>

          {/* Sparkle effects */}
          {showResult && (
            <>
              <motion.div
                className="absolute -right-4 -top-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4"
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6 text-pink-400" />
              </motion.div>
            </>
          )}
        </div>

        <Button
          onClick={rollDice}
          disabled={rolling}
          className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-2 font-semibold text-white transition-all hover:shadow-lg"
        >
          {rolling ? "Rolling..." : "Roll the Dice"}
        </Button>

        {/* Result display */}
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 w-full rounded-lg"
            style={{ backgroundColor: `${result.color}30` }}
          >
            <div className="p-4 text-center">
              <div className="mb-2 flex items-center justify-center">
                <span className="mr-2 text-3xl">{result.icon}</span>
                <h4 className="text-lg font-bold" style={{ color: result.color }}>
                  {result.text}
                </h4>
              </div>
              <p className="text-sm text-gray-700">{result.description}</p>

              <motion.div
                className="mt-2 flex justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Gift className="h-5 w-5 text-pink-500" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
