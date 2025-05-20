"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Baby photos data
const babyPhotos = [
  {
    id: 1,
    age: "Baby",
    title: "Newborn Mayly",
    image: "/placeholder.svg?height=400&width=400",
    description: "Just a few days old, already so beautiful and precious.",
  },
  {
    id: 2,
    age: "6 months",
    title: "First Smile",
    image: "/placeholder.svg?height=400&width=400",
    description: "Your smile could light up the whole room!",
  },
  {
    id: 3,
    age: "1 year",
    title: "First Birthday",
    image: "/placeholder.svg?height=400&width=400",
    description: "Celebrating your first year with cake all over your face.",
  },
  {
    id: 4,
    age: "3 years",
    title: "Playful Toddler",
    image: "/placeholder.svg?height=400&width=400",
    description: "Always curious and exploring the world around you.",
  },
  {
    id: 5,
    age: "5 years",
    title: "Kindergarten",
    image: "/placeholder.svg?height=400&width=400",
    description: "Ready for your first day of school with your favorite backpack.",
  },
  {
    id: 6,
    age: "10 years",
    title: "Double Digits",
    image: "/placeholder.svg?height=400&width=400",
    description: "Growing up so fast, but still with that same sweet smile.",
  },
]

export function BabyMemories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % babyPhotos.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + babyPhotos.length) % babyPhotos.length)
  }

  const currentPhoto = babyPhotos[currentIndex]

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
              <img
                src={currentPhoto.image || "/placeholder.svg"}
                alt={currentPhoto.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="mb-1 flex items-center justify-between">
                  <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-bold">{currentPhoto.age}</span>
                  <span className="text-sm font-medium">{currentPhoto.title}</span>
                </div>
                <p className="text-sm">{currentPhoto.description}</p>
              </div>
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
        {babyPhotos.map((_, index) => (
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
        <p className="text-sm text-gray-500">From baby to beautiful young woman</p>
      </div>
    </div>
  )
}
