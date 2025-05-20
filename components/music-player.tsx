"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Music, Pause, Play } from "lucide-react"

export function MusicPlayer() {
  // State untuk mengontrol pemutaran musik
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showControls, setShowControls] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Inisialisasi audio
  useEffect(() => {
    // Membuat elemen audio
    const audio = new Audio("/audio/mylov-song.mp3")
    audio.loop = true
    audio.volume = volume

    // Menyimpan referensi
    audioRef.current = audio

    // Membersihkan saat komponen unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Memutar musik latar
  const playMusic = () => {
    if (!audioRef.current) return

    audioRef.current.play().catch((err) => {
      console.log("Gagal memutar musik:", err)
    })

    setIsPlaying(true)
  }

  // Menjeda musik latar
  const pauseMusic = () => {
    if (!audioRef.current) return

    audioRef.current.pause()
    setIsPlaying(false)
  }

  // Beralih antara putar/jeda
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseMusic()
    } else {
      playMusic()
    }
  }

  // Beralih antara mute/unmute
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

  // Menangani perubahan volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)

    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }

    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  // Beralih visibilitas kontrol
  const toggleControls = () => {
    setShowControls(!showControls)
  }

  return (
    <div className="fixed bottom-16 right-4 z-50">
      {/* Komentar dalam Bahasa Indonesia */}
      {/* Pemutar musik latar untuk suasana romantis */}

      {/* Tombol utama */}
      <motion.button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm"
        onClick={toggleControls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Music className="h-5 w-5 text-pink-500" />
      </motion.button>

      {/* Kontrol tambahan */}
      {showControls && (
        <motion.div
          className="absolute bottom-12 right-0 rounded-lg bg-white/90 p-3 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
        >
          <div className="flex flex-col items-center space-y-2">
            {/* Tombol putar/jeda */}
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-500"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            {/* Slider volume */}
            <div className="flex w-full items-center space-x-2">
              <button className="flex h-6 w-6 items-center justify-center rounded-full" onClick={toggleMute}>
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-gray-400" />
                ) : (
                  <Volume2 className="h-4 w-4 text-pink-500" />
                )}
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

            {/* Informasi musik */}
            <p className="text-xs text-gray-600">Mayly, My Light</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
