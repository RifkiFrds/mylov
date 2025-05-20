"use client"

import { useEffect, useRef } from "react"

type AudioFallbackProps = {
  src: string
  onLoad?: () => void
}

export function AudioFallback({ src, onLoad }: AudioFallbackProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio()

    // Set up event listeners
    audio.addEventListener("canplaythrough", () => {
      console.log("Audio loaded successfully:", src)
      if (onLoad) onLoad()
    })

    audio.addEventListener("error", (e) => {
      console.log("Audio failed to load:", e)
    })

    // Set source and load
    audio.src = src
    audio.load()

    // Store reference
    audioRef.current = audio

    // Clean up
    return () => {
      audio.pause()
      audio.src = ""
      audio.removeEventListener("canplaythrough", onLoad || (() => {}))
      audio.removeEventListener("error", (e) => {
        console.log("Audio failed to load:", e)
      })
    }
  }, [src, onLoad])

  // Function to play audio with error handling
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Failed to play audio:", err)
      })
    }
  }

  return null
}
