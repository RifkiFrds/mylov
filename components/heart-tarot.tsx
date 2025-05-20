"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart } from "lucide-react"

// Data kartu tarot cinta
const tarotCards = [
  {
    id: 1,
    title: "Beach Date",
    description: "Yey It's beach date time!,Jangan lupa screenshot kartu ini ya!",
    icon: "🧺",
    color: "#FF9FF3",
  },
  {
    id: 2,
    title: "Hug Token",
    description: "Claim token in real life, aku tunggu!",
    icon: "🤗",
    color: "#A3A1FF",
  },
  {
    id: 3,
    title: "Movie Night",
    description: "Maraton One Piece wkwk",
    icon: "🎬",
    color: "#74DBEF",
  },
  {
    id: 4,
    title: "Sweet Treatment",
    description: "Kamu pasti sudah tau!",
    icon: "🕯️",
    color: "#D3B5E5",
  },
  {
    id: 5,
    title: "Surprise Gift",
    description: "Tungguin ya ~ See you",
    icon: "🎁",
    color: "#FFB6C1",
  },
]

export function HeartTarot() {
  // State untuk mengontrol permainan
  const [cards, setCards] = useState<number[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [isDealing, setIsDealing] = useState(false)

  // Memulai permainan dengan mengacak kartu
  const dealCards = () => {
    if (isDealing) return

    setIsDealing(true)
    setFlippedCards([])

    // Pilih 3 kartu secara acak
    const shuffled = [...tarotCards]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((card) => card.id)

    setCards(shuffled)

    // Setelah kartu dibagikan, izinkan pemain untuk membalik kartu
    setTimeout(() => {
      setIsDealing(false)
    }, 1000)
  }

  // Membalik kartu
  const flipCard = (cardId: number) => {
    if (isDealing || flippedCards.includes(cardId)) return

    // Memutar efek suara dengan penanganan kesalahan
    try {
      const audio = new Audio("/audio/card_flip.mp3")
      audio.play().catch((err) => {
        console.log("Gagal memutar suara kartu:", err)
      })
    } catch (error) {
      console.log("Error membuat audio:", error)
    }

    setFlippedCards([...flippedCards, cardId])
  }

  // Mendapatkan data kartu berdasarkan ID
  const getCardById = (id: number) => {
    return tarotCards.find((card) => card.id === id) || tarotCards[0]
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      {/* Komentar dalam Bahasa Indonesia */}
      {/* Permainan kartu tarot cinta berbentuk hati */}
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-pink-500">Heart Tarot Cards</h3>
        <p className="text-sm text-gray-600">Pilih kartu untuk mengungkap pesan cinta!</p>
      </div>

      <div className="flex flex-col items-center">
        {/* Area kartu */}
        <div className="mb-6 flex w-full flex-wrap justify-center gap-4">
          {cards.length > 0 ? (
            cards.map((cardId, index) => {
              const card = getCardById(cardId)
              const isFlipped = flippedCards.includes(cardId)

              return (
                <div key={index} className="relative h-40 w-32 perspective-[1000px]">
                  <motion.div
                    className="absolute inset-0 cursor-pointer"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => flipCard(cardId)}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Bagian belakang kartu (terlihat saat tidak dibalik) */}
                    <div
                      className="absolute inset-0 flex items-center justify-center rounded-xl backface-hidden"
                      style={{
                        background: "linear-gradient(135deg, #ff9ff3 0%, #a3a1ff 100%)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        zIndex: isFlipped ? 0 : 1,
                      }}
                    >
                      {/* Bentuk hati di belakang kartu */}
                      <div className="relative h-16 w-16">
                        <motion.div
                          className="absolute inset-0"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Heart className="h-full w-full text-white" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Bagian depan kartu (terlihat saat dibalik) */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center rounded-xl p-3 text-center backface-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${card.color}30 0%, ${card.color}60 100%)`,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        transform: "rotateY(180deg)",
                        zIndex: isFlipped ? 1 : 0,
                      }}
                    >
                      <div className="mb-2 text-3xl">{card.icon}</div>
                      <h4 className="mb-1 text-sm font-bold" style={{ color: card.color }}>
                        {card.title}
                      </h4>
                      <p className="text-xs text-gray-600">{card.description}</p>

                      {/* Efek sparkles saat kartu dibalik */}
                      {isFlipped && (
                        <>
                          <motion.div
                            className="absolute -right-2 -top-2"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1, rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <Sparkles className="h-4 w-4 text-yellow-400" />
                          </motion.div>
                          <motion.div
                            className="absolute -bottom-2 -left-2"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1, rotate: -360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <Sparkles className="h-4 w-4 text-pink-400" />
                          </motion.div>
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>
              )
            })
          ) : (
            <div className="flex h-40 w-full items-center justify-center rounded-lg bg-pink-50">
              <p className="text-center text-gray-500">Klik tombol di bawah untuk mengocok kartu</p>
            </div>
          )}
        </div>

        {/* Tombol kontrol */}
        <Button
          onClick={dealCards}
          disabled={isDealing}
          className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-2 font-semibold text-white transition-all hover:shadow-lg"
        >
          {cards.length === 0
            ? "Kocok Kartu"
            : flippedCards.length === 3
              ? "Kocok Ulang"
              : isDealing
                ? "Mengocok..."
                : "Kocok Ulang"}
        </Button>

        {/* Instruksi */}
        {cards.length > 0 && flippedCards.length < 3 && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Klik kartu untuk membaliknya ({flippedCards.length}/3)
          </p>
        )}

        {/* Pesan saat semua kartu dibalik */}
        {flippedCards.length === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-lg bg-pink-50 p-3 text-center"
          >
            <p className="text-sm font-medium text-pink-600">
             Semua kartu sudah terbuka — now it’s your turn to make the love happen ✨
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
