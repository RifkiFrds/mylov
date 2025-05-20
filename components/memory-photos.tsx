"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Memory photos data
const memoryPhotos = [
  {
    id: 1,
    age: "Baby",
    title: "Baby Mayly",
    image: "/images/baby.jpg",
    description: "Just a few days old, already so beautiful and precious.",
    animation: "cloud",
  },
  {
    id: 2,
    age: "10 years",
    title: "Childhood Days",
    image: "/images/10th.jpg",
    description: "Growing up with that same sweet smile and curious eyes.",
    animation: "flip",
  },
  {
    id: 3,
    age: "20 years",
    title: "Beautiful Today",
    image: "/images/now.jpg",
    description: "The amazing young woman you've become today.",
    animation: "glow",
  },
]

export function MemoryPhotos() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % memoryPhotos.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + memoryPhotos.length) % memoryPhotos.length)
  }

  const currentPhoto = memoryPhotos[currentIndex]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  // Animation variants for different photo styles
  const photoAnimations = {
    cloud: {
      initial: { y: 20, opacity: 0, scale: 0.9 },
      animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      },
    },
    flip: {
      initial: { rotateY: 90, opacity: 0 },
      animate: {
        rotateY: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      },
    },
    glow: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        boxShadow: [
          "0 0 0 rgba(244, 114, 182, 0.4)",
          "0 0 20px rgba(244, 114, 182, 0.8)",
          "0 0 10px rgba(244, 114, 182, 0.6)",
        ],
        transition: {
          opacity: { duration: 0.5 },
          boxShadow: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          },
        },
      },
    },
  }

  return (
    <div className="relative rounded-2xl bg-white p-4 shadow-lg">
      <div className="relative h-[400px] overflow-hidden rounded-xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPhoto.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full">
              {/* Photo with specific animation */}
              <motion.div
                className="relative h-full w-full"
                initial={photoAnimations[currentPhoto.animation as keyof typeof photoAnimations].initial}
                animate={photoAnimations[currentPhoto.animation as keyof typeof photoAnimations].animate}
              >
                <img
                  src={currentPhoto.image || "/placeholder.svg"}
                  alt={currentPhoto.title}
                  className="h-full w-full object-cover"
                />

                {/* Cloud decoration for baby photo */}
                {currentPhoto.animation === "cloud" && (
                  <motion.div
                    className="absolute -top-5 -left-5 -right-5 -z-10 h-20 rounded-full bg-blue-100"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}

                {/* Scrapbook decoration for childhood photo */}
                {currentPhoto.animation === "flip" && (
                  <motion.div
                    className="absolute -top-2 -right-2 h-8 w-8 rotate-45 bg-yellow-200"
                    initial={{ rotate: 45 }}
                    animate={{ rotate: [45, 50, 45] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}

                {/* Polaroid frame for current photo */}
                {currentPhoto.animation === "glow" && (
                  <motion.div
                    className="absolute -bottom-4 left-1/2 h-8 w-32 -translate-x-1/2 transform bg-white"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-bold">{currentPhoto.age}</span>
                    <span className="text-sm font-medium">{currentPhoto.title}</span>
                  </div>
                  <p className="text-sm">{currentPhoto.description}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 transform justify-between px-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="rounded-full bg-white/80 backdrop-blur-sm"
          >
            <ChevronLeft className="h-5 w-5 text-pink-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="rounded-full bg-white/80 backdrop-blur-sm"
          >
            <ChevronRight className="h-5 w-5 text-pink-500" />
          </Button>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="mt-4 flex justify-center space-x-2">
        {memoryPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-pink-500" : "bg-gray-300"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {/* Bahasa Indonesia comment */}
          {/* Foto kenangan dari bayi hingga dewasa */}
          From baby to beautiful young woman
        </p>
      </div>
    </div>
  )
}
