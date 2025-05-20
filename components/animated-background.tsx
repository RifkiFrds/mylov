"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type FloatingElement = {
  id: number
  type: "heart" | "cake" | "arrow" | "balloon" | "sparkle" | "cloud"
  x: number
  y: number
  size: number
  rotation: number
  delay: number
  duration: number
}

export function AnimatedBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Generate random floating elements
    const newElements: FloatingElement[] = []

    // Generate hearts
    for (let i = 0; i < 10; i++) {
      newElements.push({
        id: i,
        type: "heart",
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        rotation: Math.random() * 30 - 15,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 5,
      })
    }

    // Generate cakes
    for (let i = 0; i < 5; i++) {
      newElements.push({
        id: i + 10,
        type: "cake",
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 10,
        rotation: Math.random() * 20 - 10,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 5,
      })
    }

    // Generate arrows
    for (let i = 0; i < 5; i++) {
      newElements.push({
        id: i + 15,
        type: "arrow",
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 15,
        rotation: Math.random() * 360,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 5,
      })
    }

    // Generate balloons
    for (let i = 0; i < 7; i++) {
      newElements.push({
        id: i + 20,
        type: "balloon",
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 15,
        rotation: Math.random() * 20 - 10,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 5,
      })
    }

    // Generate sparkles
    for (let i = 0; i < 12; i++) {
      newElements.push({
        id: i + 27,
        type: "sparkle",
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      })
    }

    // Generate clouds
    for (let i = 0; i < 5; i++) {
      newElements.push({
        id: i + 39,
        type: "cloud",
        x: Math.random() * 100,
        y: Math.random() * 30,
        size: Math.random() * 30 + 20,
        rotation: 0,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
      })
    }

    setElements(newElements)
  }, [])

  const renderElement = (element: FloatingElement) => {
    switch (element.type) {
      case "heart":
        return (
          <div className="text-pink-400" style={{ fontSize: `${element.size}px` }}>
            💖
          </div>
        )
      case "cake":
        return <div style={{ fontSize: `${element.size}px` }}>🎂</div>
      case "arrow":
        return <div style={{ fontSize: `${element.size}px` }}>🏹</div>
      case "balloon":
        return <div style={{ fontSize: `${element.size}px` }}>🎈</div>
      case "sparkle":
        return <div style={{ fontSize: `${element.size}px` }}>✨</div>
      case "cloud":
        return (
          <div className="opacity-30" style={{ fontSize: `${element.size}px` }}>
            ☁️
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none w-full max-w-[100vw]">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${Math.min(Math.max(element.x, 0), 95)}%`, // Constrain between 0-95%
            top: `${Math.min(Math.max(element.y, 0), 95)}%`, // Constrain between 0-95%
            zIndex: 5,
          }}
          animate={{
            y: [0, -20, 0],
            x: element.type === "cloud" ? ["0%", "110%"] : undefined,
            rotate: element.rotation,
          }}
          transition={{
            y: {
              duration: element.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: element.delay,
            },
            x:
              element.type === "cloud"
                ? {
                    duration: element.duration * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: element.delay,
                  }
                : undefined,
            rotate: {
              duration: element.duration * 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: element.delay,
            },
          }}
        >
          {renderElement(element)}
        </motion.div>
      ))}
    </div>
  )
}
