"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, ArrowUp } from "lucide-react"

export function Footer() {
  const [isHovered, setIsHovered] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="relative mt-20 rounded-t-3xl bg-gradient-to-r from-pink-100 to-purple-100 px-6 pb-8 pt-10 text-center">
      {/* Bahasa Indonesia comment */}
      {/* Bagian footer dengan pesan romantis */}

      {/* Decorative elements */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
          animate={{
            y: [0, -5, 0],
            boxShadow: [
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Heart className="h-6 w-6 text-pink-500" />
        </motion.div>
      </div>

      <div className="mx-auto max-w-md">
        <motion.h3
          className="mb-4 text-xl font-bold text-pink-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
         Sekali lagi Happy 20th Birthday, Mylov!
        </motion.h3>

        <motion.p
  className="mb-6 text-pink-500 whitespace-pre-line"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  {"Finally, kamu sudah sampai di bagian akhir dari project spesial ini!\n" +
  "Happy birthday mylov, ga kerasa ya, sekarang kamu sudah genap 20 tahun. I’m so proud to be the one who celebrates this special day with you—on this even year, in this beautiful moment.\n\n" +
  "Doa dan harapan terbaik selalu aku panjatkan untuk kesuksesan masa depan kamu. Walaupun banyak hal berat yang pernah terjadi di tahun-tahun sebelumnya, please keep going and keep rising. Aku percaya kamu adalah wanita tangguh.\n\n" +
  "Thank you for being such a great part of my life.\n" +
  "Selama 1 tahun 5 bulan ini, kita udah banyak banget ngelewatin suka dan duka bareng. I hope you’ll always remember how we once shared the same feelings—and still do until today.\n\n" +
  "Again and again, happy birthday mylov.\n" +
  "I love you so much. See you on your special day!"}
</motion.p>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="rounded-full bg-white px-6 py-2 font-semibold text-pink-500 shadow-md transition-all hover:bg-pink-50"
          >
            <motion.div animate={{ y: isHovered ? -3 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowUp className="mr-2 h-4 w-4" />
            </motion.div>
            Back to Top
          </Button>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-lg">🎀</div>
          <div className="text-lg">🎂</div>
          <div className="text-lg">💝</div>
          <div className="text-lg">🎊</div>
          <div className="text-lg">🎈</div>
        </motion.div>

        <motion.p
          className="mt-6 text-xs text-pink-400/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Made with love for Mayly Winarty Dewi 20th Birthday
        </motion.p>
      </div>
    </footer>
  )
}
