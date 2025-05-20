"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Pagination } from "swiper/modules"
import { Heart } from "lucide-react"

// Card data - 20 cards for 20 years
const cardData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  year: i + 1,
  message: `Year ${i + 1}: ${getYearMessage(i + 1)}`,
  color: getCardColor(i),
}))

// Helper function to get a message for each year
function getYearMessage(year: number): string {
  const messages = [
   "Terimakasih udah lahir di dunia ini dengan perwujudan wanita cantik. You’re literally a blessing✨.",
    "Mamah pasti bangga banget bisa lahirin anak se-perfect kamu!",
    "Ayah juga pasti seneng liat anak secantik kamu lahir dari rahim Mamah kamu :) lucky parents!",
    "Keluarga besar kamu juga pasti happy banget pas kamu lahir.",
    "Ini pasti moment kamu lagi lucu-lucunya! baby mayly gbisa ngebayangin🙏😭",
    "Yey baby Mayly udah bisa jalan! Satu langkah kecil buat kamu, satu langkah besar buat dunia😼!",
    "Mayly kecil pasti suka banget main sama kucing🤔",
    "Sudah masuk TK kamu pasti ya! Pasti jadi murid favorit bu guru karena pinter dan aktif.",
    "Aku yakin Mayly kecil adalah anak yang aktif, ceria, dan pastinya smart banget!",
    "Belajar dan belajar, Sekolah Dasar udah nunggu kamu jadi bintang di kelas. Let’s go!",
    "Banggakan kedua orang tua kamu dengan prestasi yang gemilang! You got this, little champ!",
    "Wanita kecil yang hebat di antara se-usianya! You were already a leader sejak kecil.",
    "Kamu pasti udah banyak banget prestasi yang berhasil diraih (termasuk nari jaipongan)! Proud of you 💃🏽!",
    "SMP, moment di mana kamu mulai cari teman-teman yang klik dan ngerti kamu banget.",
    "Pasti kamu udah kenal cowo ya🤬",
    "Kamu mulai dewasa, dan banyak hal kamu lewatin. I’m proud of how strong you are.",
    "Aku pengen banget kenal kamu di umur itu, pasti akan banyak pengalaman baru dan menghapus hal hal buruk!",
    "Yuk ke Jepang💮",
    "Ini umur kamu yang super spesial buat aku, karena kamu kenal aku di umur ini! Best plot twist ever!",
    "Now, thank you udah bersama aku sampai detik ini. I love you so freakin’ much, Mayly",
  ]

  return messages[year - 1] || "Another amazing year of your life!"
}

// Helper function to get a color for each card
function getCardColor(index: number): string {
  const colors = [
    "from-pink-400 to-purple-300",
    "from-purple-400 to-blue-300",
    "from-blue-400 to-teal-300",
    "from-teal-400 to-green-300",
    "from-green-400 to-yellow-300",
    "from-yellow-400 to-orange-300",
    "from-orange-400 to-red-300",
    "from-red-400 to-pink-300",
  ]

  return colors[index % colors.length]
}

export function LoveCards() {
  const [flipped, setFlipped] = useState<number | null>(null)

  const handleFlip = (id: number) => {
    if (flipped === id) {
      setFlipped(null)
    } else {
      setFlipped(id)
    }
  }

  return (
    <div className="relative">
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards, Pagination]}
        className="love-cards-swiper"
        pagination={{
          clickable: true,
        }}
      >
        {cardData.map((card) => (
          <SwiperSlide key={card.id}>
            <div className="relative h-80 w-full cursor-pointer" onClick={() => handleFlip(card.id)}>
              <motion.div
                className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 p-6 shadow-lg"
                animate={{
                  rotateY: flipped === card.id ? 180 : 0,
                  zIndex: flipped === card.id ? 0 : 1,
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                    <span className="text-2xl font-bold text-pink-500">{card.year}</span>
                  </div>
                  <h3 className="mb-2 text-center text-xl font-bold text-pink-600">Year {card.year}</h3>
                  <p className="text-center text-sm text-gray-600">Tap to reveal a special message</p>
                  <div className="mt-4 flex justify-center">
                    <Heart className="h-8 w-8 animate-pulse text-pink-400" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className={`absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br ${card.color} p-6 shadow-lg`}
                initial={{ rotateY: -180 }}
                animate={{
                  rotateY: flipped === card.id ? 0 : -180,
                  zIndex: flipped === card.id ? 1 : 0,
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-md">
                    <Heart className="h-6 w-6 text-pink-500" />
                  </div>
                  <p className="text-center text-lg font-medium text-white">{card.message}</p>
                  <p className="mt-4 text-center text-sm text-white/80">Tap to flip back</p>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">20 cards for 20 beautiful years</p>
      </div>
    </div>
  )
}
