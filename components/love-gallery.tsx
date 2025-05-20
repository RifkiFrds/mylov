"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Pagination } from "swiper/modules"
import { Heart, Calendar, MapPin } from "lucide-react"

// Gallery data
const galleryData = [
  {
    id: 1,
    title: "First Date",
    date: "December 03, 2023",
    location: "Jakarta International Expo",
    image: "/images/motionime.jpg",
    caption: "Thank you Windut, Sudah buat event Motionime, karenanya kita bisa bertemu ~_~",
  },
  {
    id: 2,
    title: "Ghibli Date",
    date: "December 17, 2023",
    location: "Buaran Plaza",
    image: "/images/ghibli.jpg",
    caption: "Dua kali pertemuan sepertinya kita kaya WIBUUUU",
  },
  {
    id: 3,
    title: "Picnic Date",
    date: "December 27, 2023",
    location: "Bogor Botanical Garden",
    image: "/images/picnic.jpg",
    caption: "Pertemuan terakhir di tahun 2023, I'm so happy ",
  },
  {
    id: 4,
    title: "Museum Date",
    date: "January 21, 2024",
    location: "National Museum",
    image: "/images/museum.jpg",
    caption: "Exploring art, history, and lari di kejar hujan di tengah-tengah lapangan Monas T_T",
  },
  {
    id: 5,
    title: "Movie Date",
    date: "February 25, 2024",
    location: "Transpark Mall Juanda",
    image: "/images/movie.jpg",
    caption: "Thank you",
  },
  {
    id: 6,
    title: "City Light Date",
    date: "June 22, 2024",
    location: "Jakarta City",
    image: "/images/city.jpg",
    caption: "Bibu Sakit!!!!!!!!!!!!",
  },
]

export function LoveGallery() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="relative">
      {/* Bahasa Indonesia comment */}
      {/* Galeri foto kenangan bersama */}
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards, Pagination]}
        className="love-gallery-swiper"
        pagination={{
          clickable: true,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {galleryData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="relative h-64 w-full overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <div className="mt-1 flex items-center text-sm text-white/80">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{item.date}</span>
                    <MapPin className="ml-2 mr-1 h-3 w-3" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700">{item.caption}</p>
                <div className="mt-4 flex justify-end">
                  <Heart className="h-5 w-5 text-pink-500" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnimatePresence>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-lg font-medium text-pink-500">{galleryData[activeIndex].title}</p>
          <p className="text-sm text-gray-500">Swipe to see more memories</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
