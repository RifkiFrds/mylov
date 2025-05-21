"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Music, Pause, Play } from "lucide-react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showControls, setShowControls] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio("/audio/mylov-song.mp3")
    audio.loop = true
    audio.volume = volume
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const playMusic = () => {
    if (!audioRef.current) return
    audioRef.current.play().catch((err) => {
      console.log("Gagal memutar musik:", err)
    })
    setIsPlaying(true)
  }

  const pauseMusic = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    console.log("Tombol dipencet:", isPlaying ? "Pause" : "Play")
    isPlaying ? pauseMusic() : playMusic()
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    if (isMuted) {
      audioRef.current.volume = volume
      setIsMuted(false)
    } else {
      audioRef.current.volume = 0
      setIsMuted(true)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) audioRef.current.volume = newVolume
    setIsMuted(newVolume === 0)
  }

  const toggleControls = () => setShowControls(!showControls)

  return (
    <div className="fixed bottom-24 right-0 z-[9999]">
      <motion.button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm"
        onClick={toggleControls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Music className="h-5 w-5 text-pink-500" />
      </motion.button>

      {showControls && (
        <motion.div
          className="absolute bottom-12 right-0 rounded-lg bg-white/90 p-3 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
        >
          <div className="flex flex-col items-center space-y-2">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-500"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            <div className="flex w-full items-center space-x-2">
              <button className="flex h-6 w-6 items-center justify-center rounded-full" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4 text-gray-400" /> : <Volume2 className="h-4 w-4 text-pink-500" />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="h-1 w-24 appearance-none rounded-full bg-gray-200 accent-pink-500"
              />
            </div>

            <p className="text-xs text-gray-600">Mayly, My Light</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
