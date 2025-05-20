"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shuffle, Heart, Check } from "lucide-react"
import confetti from "canvas-confetti"

// Ini adalah tipe untuk potongan puzzle
type PuzzlePiece = {
  id: number
  correctPosition: number
  currentPosition: number
  backgroundPosition: string
}

// Ini adalah komponen utama untuk permainan puzzle kenangan
export function MemoryPuzzle() {
  // State untuk mengontrol permainan
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [moves, setMoves] = useState(0)
  const [showReward, setShowReward] = useState(false)
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null)
  const [gridSize, setGridSize] = useState(3) // 3x3 grid
  const totalPieces = gridSize * gridSize
  const [imageLoaded, setImageLoaded] = useState(false)
  const [puzzleImage, setPuzzleImage] = useState(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-18%20at%2015.01.59-zUzFiwNryQ0M13fa4HzaSei7jYqfDF.jpeg",
  )

  // Inisialisasi puzzle
  useEffect(() => {
    // Preload image to ensure it's available
    const img = new Image()
    img.src = puzzleImage
    img.onload = () => {
      setImageLoaded(true)
      initializePuzzle()
    }
  }, [puzzleImage])

  // Memeriksa apakah puzzle sudah selesai
  useEffect(() => {
    if (pieces.length > 0 && pieces.every((piece) => piece.currentPosition === piece.correctPosition)) {
      if (!isComplete) {
        setIsComplete(true)
        celebratePuzzleComplete()
      }
    }
  }, [pieces, isComplete])

  // Fungsi untuk menginisialisasi puzzle
  const initializePuzzle = () => {
    // Membuat potongan puzzle terurut
    const orderedPieces: PuzzlePiece[] = []

    for (let i = 0; i < totalPieces; i++) {
      // Calculate the background position for this piece
      const row = Math.floor(i / gridSize)
      const col = i % gridSize
      const backgroundPosition = `${-col * (100 / (gridSize - 1))}% ${-row * (100 / (gridSize - 1))}%`

      orderedPieces.push({
        id: i,
        correctPosition: i,
        currentPosition: i,
        backgroundPosition,
      })
    }

    // Mengacak potongan puzzle
    const shuffledPieces = [...orderedPieces]

    // Algoritma pengacakan Fisher-Yates
    for (let i = shuffledPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = shuffledPieces[i].currentPosition
      shuffledPieces[i].currentPosition = shuffledPieces[j].currentPosition
      shuffledPieces[j].currentPosition = temp
    }

    setPieces(shuffledPieces)
    setIsComplete(false)
    setMoves(0)
    setShowReward(false)
    setSelectedPiece(null)
  }

  // Fungsi untuk menangani klik pada potongan puzzle
  const handlePieceClick = (clickedPiece: PuzzlePiece) => {
    if (isComplete) return

    // Jika belum ada potongan yang dipilih, pilih potongan ini
    if (selectedPiece === null) {
      setSelectedPiece(clickedPiece.id)
      return
    }

    // Jika potongan yang sama diklik lagi, batalkan pemilihan
    if (selectedPiece === clickedPiece.id) {
      setSelectedPiece(null)
      return
    }

    // Jika potongan lain dipilih, tukar posisinya
    const selectedPieceIndex = pieces.findIndex((p) => p.id === selectedPiece)
    const clickedPieceIndex = pieces.findIndex((p) => p.id === clickedPiece.id)

    // Tukar posisi
    const newPieces = [...pieces]
    const temp = newPieces[selectedPieceIndex].currentPosition
    newPieces[selectedPieceIndex].currentPosition = newPieces[clickedPieceIndex].currentPosition
    newPieces[clickedPieceIndex].currentPosition = temp

    // Perbarui state
    setPieces(newPieces)
    setMoves(moves + 1)
    setSelectedPiece(null)
  }

  // Fungsi untuk merayakan penyelesaian puzzle
  const celebratePuzzleComplete = () => {
    // Enhanced confetti effect with multiple bursts
    const triggerConfetti = () => {
      // First burst - center
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6, x: 0.5 },
        colors: ["#ff9ff3", "#a3a1ff", "#ffdda1", "#74dbef", "#ff6b6b"],
      })

      // Second burst - left side after a small delay
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 50,
          origin: { y: 0.6, x: 0.3 },
          colors: ["#ff9ff3", "#a3a1ff", "#ffdda1"],
        })
      }, 300)

      // Third burst - right side after another small delay
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 50,
          origin: { y: 0.6, x: 0.7 },
          colors: ["#74dbef", "#ff6b6b", "#ffdda1"],
        })
      }, 600)
    }

    // Trigger initial confetti
    triggerConfetti()

    // Add a second wave of confetti after a delay
    setTimeout(() => {
      triggerConfetti()
    }, 1500)

    // Menampilkan hadiah setelah beberapa saat
    setTimeout(() => {
      setShowReward(true)
    }, 1000)

    // Memutar efek suara dengan penanganan kesalahan
    try {
      const audio = new Audio("/api/audio-placeholder")
      audio.play().catch((err) => {
        console.log("Gagal memutar suara sukses:", err)
      })
    } catch (error) {
      console.log("Error membuat audio:", error)
    }
  }

  // Fungsi untuk mendapatkan gaya potongan puzzle
  const getPieceStyle = (piece: PuzzlePiece) => {
    const pieceSize = 100 / gridSize

    // Menghitung posisi saat ini dalam grid
    const currentRow = Math.floor(piece.currentPosition / gridSize)
    const currentCol = piece.currentPosition % gridSize

    return {
      position: "absolute" as const,
      width: `${pieceSize}%`,
      height: `${pieceSize}%`,
      top: `${currentRow * pieceSize}%`,
      left: `${currentCol * pieceSize}%`,
      backgroundImage: `url('${puzzleImage}')`,
      backgroundSize: `${gridSize * 100}%`,
      backgroundPosition: piece.backgroundPosition,
      cursor: isComplete ? "default" : "pointer",
      border: piece.id === selectedPiece ? "3px solid #ec4899" : "1px solid white",
      boxSizing: "border-box" as const,
      transition: "all 0.3s ease",
    }
  }

  // Tampilkan loading jika gambar belum dimuat
  if (!imageLoaded) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-pink-200 border-t-pink-500"></div>
          <p className="text-sm text-gray-600">Memuat puzzle foto...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-lg">
      {/* Komentar dalam Bahasa Indonesia */}
      {/* Permainan puzzle kenangan */}
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-pink-500">Memory Puzzle</h3>
        <p className="text-sm text-gray-600">Puzzle time! Masi ingat foto ini kan?, Ayo susun puzzle-nya!</p>
      </div>

      {!showReward ? (
        <>
          <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
            {isComplete ? (
              // Show complete image when puzzle is solved
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full w-full"
                style={{
                  backgroundImage: `url('${puzzleImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ) : (
              // Show puzzle pieces
              pieces.map((piece) => (
                <motion.div
                  key={piece.id}
                  style={getPieceStyle(piece)}
                  onClick={() => handlePieceClick(piece)}
                  whileHover={!isComplete ? { scale: 0.95 } : {}}
                  whileTap={!isComplete ? { scale: 0.9 } : {}}
                  animate={isComplete ? { scale: [1, 1.02, 1] } : {}}
                  transition={isComplete ? { duration: 0.5, repeat: 3 } : {}}
                />
              ))
            )}
          </div>

          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Langkah: {moves}</span>
            <Button variant="outline" size="sm" onClick={initializePuzzle} disabled={isComplete && showReward}>
              <Shuffle className="mr-1 h-4 w-4" /> Acak
            </Button>
          </div>

          {isComplete && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
              <p className="mb-2 text-lg font-bold text-pink-500">Puzzle Selesai! 🎉</p>
              <p className="mb-4 text-sm text-gray-600">Kamu menyelesaikannya dalam {moves} langkah!</p>
              <div className="flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Check className="h-12 w-12 text-green-500" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <div className="py-2">
          <h4 className="mb-4 text-center text-lg font-bold text-pink-500">Hadiah Spesialmu</h4>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-pink-50 p-6 text-center"
          >
            <motion.div
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-pink-100"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 rgba(244, 114, 182, 0.4)",
                  "0 0 20px rgba(244, 114, 182, 0.8)",
                  "0 0 0 rgba(244, 114, 182, 0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart className="h-10 w-10 text-pink-500" />
            </motion.div>

            <motion.h5
              className="mb-2 text-xl font-bold text-pink-600"
              animate={{
                scale: [1, 1.05, 1],
                color: ["#db2777", "#ec4899", "#db2777"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Pesan Spesial
            </motion.h5>

            <motion.p
              className="mb-4 text-pink-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Because every piece of our memory together forms the whole happiness 💖
            </motion.p>

            <motion.div
              className="flex justify-center"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart className="h-8 w-8 text-pink-500" />
            </motion.div>
          </motion.div>

          <div className="mt-4 flex justify-center">
            <Button variant="outline" size="sm" onClick={initializePuzzle}>
              <Shuffle className="mr-1 h-4 w-4" /> Main Lagi
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
