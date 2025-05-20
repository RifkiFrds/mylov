"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"
import Typed from "typed.js"

export default function HomePage() {
  // Ini adalah state untuk mengontrol tampilan dan interaksi halaman
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [musicStarted, setMusicStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Inisialisasi Typed.js
    const typed = new Typed("#typed-text", {
      strings: ["Happy 20th Birthday,<br>Mayly Winarty Dewi 💖"],
      typeSpeed: 50,
      backSpeed: 0,
      loop: false,
      showCursor: true,
      cursorChar: "❤️",
      onComplete: () => {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      },
    })

    // Inisialisasi audio
    const audio = new Audio("/audio/mylov-song.mp3")
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    return () => {
      typed.destroy()
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const handleEnter = () => {
    // Mulai musik latar belakang
    if (audioRef.current && !musicStarted) {
      audioRef.current.play().catch((err) => {
        console.log("Gagal memutar musik:", err)
      })
      setMusicStarted(true)
    }

    router.push("/main")
  }

  return (
    <div className="relative h-screen w-full overflow-hidden max-w-[100vw] bg-gradient-to-b from-pink-100 to-purple-100">
      {/* Latar belakang partikel */}
      <div className="z-[-1] overflow-hidden max-w-[100vw]">
        <ParticleBackground />
      </div>

      {/* Elemen audio */}
      <audio
        ref={audioRef}
        src="/audio/mylov-song.mp3"
        loop
        preload="auto"
        onError={(e) => {
          console.log("Audio gagal dimuat:", e)
        }}
      />

      {/* Konten utama */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 rounded-3xl bg-white/80 p-8 backdrop-blur-sm"
        >
          <h1 className="mb-4 font-baloo text-4xl font-bold text-pink-500">
            <span id="typed-text"></span>
          </h1>

          <div className="mt-8 flex justify-center">
            {!loading && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                <Button
                  onClick={handleEnter}
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-8 py-6 font-baloo text-xl font-bold text-white shadow-lg transition-all hover:shadow-pink-300/50"
                >
                  <span className="relative z-10">Click Mayly Birthday Space</span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <Heart className="h-full w-full animate-pulse text-pink-200" />
                  </span>
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-4 text-sm text-pink-700"
        >
          <p>Born on May 23rd, 2005 ✨</p>
        </motion.div>
      </div>
    </div>
  )
}
