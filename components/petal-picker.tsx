"use client"

import { useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart } from "lucide-react"

// Data ramalan romantis
const romanticFortunes = [
  {
    id: 1,
    fortune: "Cinta sejatimu selalu ada di sisimu, bahkan saat kamu tidak menyadarinya.",
    icon: "💖",
    color: "#FF9FF3",
  },
  {
    id: 2,
    fortune: "Bulan depan akan membawa kejutan romantis yang tak terduga.",
    icon: "🌙",
    color: "#A3A1FF",
  },
  {
    id: 3,
    fortune: "Perjalanan cinta kalian akan dipenuhi tawa dan kebahagiaan.",
    icon: "😊",
    color: "#FFDDA1",
  },
  {
    id: 4,
    fortune: "Seseorang sedang memikirkanmu saat ini dengan penuh kasih sayang.",
    icon: "💭",
    color: "#74DBEF",
  },
  {
    id: 5,
    fortune: "Cintamu akan tumbuh lebih kuat setiap hari seperti bunga yang mekar.",
    icon: "🌸",
    color: "#FF6B6B",
  },
  {
    id: 6,
    fortune: "Bintang-bintang telah menyelaraskan takdir cinta kalian berdua.",
    icon: "⭐",
    color: "#D3B5E5",
  },
  {
    id: 7,
    fortune: "Ketulusan hatimu akan membawa kebahagiaan abadi dalam hubunganmu.",
    icon: "✨",
    color: "#FFB6C1",
  },
]

export function PetalPicker() {
  // State untuk mengontrol permainan
  const [petals, setPetals] = useState<{ id: number; x: number; y: number; rotation: number; scale: number }[]>([])
  const [selectedPetal, setSelectedPetal] = useState<number | null>(null)
  const [fortune, setFortune] = useState<(typeof romanticFortunes)[0] | null>(null)
  const [showFortune, setShowFortune] = useState(false)
  const [gameActive, setGameActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationControls = useAnimation()
  const [flowerVisible, setFlowerVisible] = useState(true)

  // Memulai permainan
  const startGame = () => {
    if (gameActive) return

    setGameActive(true)
    setSelectedPetal(null)
    setFortune(null)
    setShowFortune(false)
    setFlowerVisible(false)

    // Membuat kelopak bunga yang jatuh
    const newPetals = []
    for (let i = 0; i < 12; i++) {
      newPetals.push({
        id: i,
        x: Math.random() * 100, // Posisi x acak (0-100%)
        y: -20 - Math.random() * 30, // Mulai dari atas layar
        rotation: Math.random() * 360, // Rotasi acak
        scale: 0.5 + Math.random() * 0.5, // Ukuran acak
      })
    }
    setPetals(newPetals)

    // Animasi kelopak jatuh
    setTimeout(() => {
      animatePetalsFalling()
    }, 100)
  }

  // Animasi kelopak bunga jatuh
  const animatePetalsFalling = async () => {
    if (!containerRef.current) return

    try {
      await animationControls.start((i) => ({
        y: [null, containerRef.current ? containerRef.current.clientHeight : 300],
        rotate: [null, i % 2 === 0 ? 360 : -360],
        transition: {
          duration: 8,
          ease: "linear",
          delay: i * 0.2,
        },
      }))
    } catch (error) {
      console.error("Animation error:", error)
    }
  }

  // Menangani klik pada kelopak bunga
  const handlePetalClick = (petalId: number) => {
    if (!gameActive || showFortune) return

    setSelectedPetal(petalId)

    // Pilih ramalan secara acak
    const randomFortune = romanticFortunes[Math.floor(Math.random() * romanticFortunes.length)]
    setFortune(randomFortune)
    setShowFortune(true)

    // Hentikan permainan
    setGameActive(false)
    setFlowerVisible(true)

    // Memutar efek suara dengan penanganan kesalahan
    try {
      const audio = new Audio("/api/audio-placeholder")
      audio.play().catch((err) => {
        console.log("Gagal memutar suara:", err)
      })
    } catch (error) {
      console.log("Error membuat audio:", error)
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      {/* Komentar dalam Bahasa Indonesia */}
      {/* Permainan kelopak bunga untuk ramalan cinta */}
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-pink-500">Petal Picker</h3>
        <p className="text-sm text-gray-600">Pilih kelopak bunga untuk mengungkap ramalan cintamu!</p>
      </div>

      <div className="flex flex-col items-center">
        {/* Area permainan */}
        <div
          ref={containerRef}
          className="relative mb-4 h-64 w-full overflow-hidden rounded-lg bg-gradient-to-b from-pink-50 to-purple-50"
          style={{ zIndex: 10 }}
        >
          {/* Daisy flower image */}
          {flowerVisible && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%2015.06.19-i9stdUIFoLN6XBumV6kPtNmdjM5tp2.jpeg"
                alt="Daisy Flower"
                className="h-32 w-32 object-contain"
              />
            </motion.div>
          )}

          {/* Kelopak bunga yang jatuh - using daisy petals */}
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute cursor-pointer z-20"
              style={{
                left: `${petal.x}%`,
                top: `${petal.y}%`,
                rotate: petal.rotation,
                scale: petal.scale,
              }}
              custom={petal.id}
              animate={animationControls}
              onClick={() => handlePetalClick(petal.id)}
              whileHover={{ scale: petal.scale * 1.2 }}
            >
              {/* Using the daisy petal image */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%2015.06.19-i9stdUIFoLN6XBumV6kPtNmdjM5tp2.jpeg"
                alt="Daisy Petal"
                className="h-10 w-4 object-contain"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  transform: "rotate(90deg)",
                }}
              />
            </motion.div>
          ))}

          {/* Tampilkan ramalan */}
          {showFortune && fortune && (
            <motion.div
              className="absolute inset-0 z-30 flex items-center justify-center bg-white/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <motion.div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${fortune.color}30` }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span className="text-3xl">{fortune.icon}</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h4 className="mb-2 text-lg font-bold text-pink-600">Ramalan Cintamu</h4>
                  <p className="text-gray-700">{fortune.fortune}</p>
                </motion.div>

                {/* Efek sparkles */}
                <motion.div
                  className="absolute -right-2 -top-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6 text-yellow-400" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-2"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6 text-pink-400" />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Instruksi permainan */}
          {!gameActive && !showFortune && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-center text-gray-500">Klik tombol di bawah untuk memulai</p>
            </div>
          )}

          {gameActive && !showFortune && (
            <div className="absolute bottom-2 left-0 right-0 text-center z-30">
              <p className="text-sm text-pink-600">Pilih kelopak bunga yang jatuh!</p>
            </div>
          )}
        </div>

        {/* Tombol kontrol */}
        <Button
          onClick={startGame}
          disabled={gameActive}
          className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-2 font-semibold text-white transition-all hover:shadow-lg"
        >
          {showFortune ? "Coba Lagi" : gameActive ? "Kelopak Sedang Jatuh..." : "Jatuhkan Kelopak Bunga"}
        </Button>

        {/* Dekorasi bawah */}
        <motion.div
          className="mt-4 flex justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Heart className="h-5 w-5 text-pink-300" />
        </motion.div>
      </div>
    </div>
  )
}
