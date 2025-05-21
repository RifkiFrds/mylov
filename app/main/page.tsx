"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Heart, Cake, Gift, Calendar, Camera, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CountdownTimer } from "@/components/countdown-timer"
import { LoveGallery } from "@/components/love-gallery"
import { LoveCards } from "@/components/love-cards"
import { MemoryPhotos } from "@/components/memory-photos"
import { GiftReveal } from "@/components/gift-reveal"
import { MemoryPuzzle } from "@/components/memory-puzzle"
import { AnimatedBackground } from "@/components/animated-background"
import { Footer } from "@/components/footer"
import { LoveReasons } from "@/components/love-reasons"
import { MusicPlayer } from "@/components/music-player"
import { BirthdayCakeGame } from "@/components/birthday-cake-game"
import { PetalPicker } from "@/components/petal-picker"
import { HeartTarot } from "@/components/heart-tarot"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/pagination"
import "swiper/css/navigation"

export default function MainPage() {
  // Ini adalah state untuk mengontrol navigasi dan tampilan halaman
  const [activeSection, setActiveSection] = useState("welcome")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { ref: welcomeRef, inView: welcomeInView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  const { ref: galleryRef, inView: galleryInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  const { ref: countdownRef, inView: countdownInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  const { ref: cakeRef, inView: cakeInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  const { ref: memoryRef, inView: memoryInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  const { ref: surpriseRef, inView: surpriseInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  const { ref: gamesRef, inView: gamesInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  useEffect(() => {
    // Mengatur bagian aktif berdasarkan bagian mana yang terlihat
    if (welcomeInView) setActiveSection("welcome")
    else if (cakeInView) setActiveSection("cake")
    else if (galleryInView) setActiveSection("gallery")
    else if (countdownInView) setActiveSection("countdown")
    else if (memoryInView) setActiveSection("memory")
    else if (surpriseInView) setActiveSection("surprise")
    else if (gamesInView) setActiveSection("games")
  }, [
    welcomeInView,
    galleryInView,
    countdownInView,
    cakeInView,
    memoryInView,
    surpriseInView,
    gamesInView,
    gamesInView,
  ])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="heart-cursor relative min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 pb-20">
      {/* Pola latar belakang */}
      <div className="fixed inset-0 z-[-2] opacity-30 w-full overflow-hidden">
        <div className="memphis-pattern"></div>
        <div className="zigzag-pattern"></div>
        <div className="dots-pattern"></div>
      </div>

      {/* Elemen latar belakang animasi */}
      <div className="z-[-1]">
        <AnimatedBackground />
      </div>

      {/* Pemutar musik */}
      <MusicPlayer />

      {/* Navigasi */}
      <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur-md">
        <ul className="flex items-center space-x-4">
          <li>
            <Button
              variant={activeSection === "welcome" ? "default" : "ghost"}
              size="icon"
              onClick={() => scrollToSection("welcome")}
              className="rounded-full"
            >
              <Star className={`h-5 w-5 ${activeSection === "welcome" ? "text-white" : "text-pink-400"}`} />
            </Button>
          </li>
          <li>
            <Button
              variant={activeSection === "gallery" ? "default" : "ghost"}
              size="icon"
              onClick={() => scrollToSection("gallery")}
              className="rounded-full"
            >
              <Camera className={`h-5 w-5 ${activeSection === "gallery" ? "text-white" : "text-pink-400"}`} />
            </Button>
          </li>
          <li>
            <Button
              variant={activeSection === "countdown" ? "default" : "ghost"}
              size="icon"
              onClick={() => scrollToSection("countdown")}
              className="rounded-full"
            >
              <Calendar className={`h-5 w-5 ${activeSection === "countdown" ? "text-white" : "text-pink-400"}`} />
            </Button>
          </li>
          <li>
            <Button
              variant={activeSection === "cake" ? "default" : "ghost"}
              size="icon"
              onClick={() => scrollToSection("cake")}
              className="rounded-full"
            >
              <Cake className={`h-5 w-5 ${activeSection === "cake" ? "text-white" : "text-pink-400"}`} />
            </Button>
          </li>
          <li>
            <Button
              variant={activeSection === "memory" ? "default" : "ghost"}
              size="icon"
              onClick={() => scrollToSection("memory")}
              className="rounded-full"
            >
              <Heart className={`h-5 w-5 ${activeSection === "memory" ? "text-white" : "text-pink-400"}`} />
            </Button>
          </li>
          <li>
            <Button
              variant={activeSection === "surprise" ? "default" : "ghost"}
              size="icon"
              onClick={() => scrollToSection("surprise")}
              className="rounded-full"
            >
              <Gift className={`h-5 w-5 ${activeSection === "surprise" ? "text-white" : "text-pink-400"}`} />
            </Button>
          </li>
        </ul>
      </nav>

      {/* Konten utama */}
      <main className="container mx-auto max-w-md px-4 overflow-x-hidden">
        {/* Bagian selamat datang */}
        <section id="welcome" ref={welcomeRef} className="min-h-screen py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl bg-white/80 p-6 shadow-lg backdrop-blur-md"
          >
            <div className="mb-6 text-center">
              <h1 className="mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
                Happy 20th Birthday Mylov!
              </h1>
              <h2 className="text-2xl font-semibold text-pink-400">Mayly Winarty Dewi</h2>
              <p className="mt-2 text-gray-600">Born on May 23rd, 2005</p>
            </div>

            <div className="relative mb-6 overflow-hidden rounded-2xl">
              <img
                src="/images/mayly-profile.jpg"
                alt="Mayly's Birthday"
                className="h-auto w-full rounded-2xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-center text-white">
                <p className="text-xl font-bold">Celebrating Your Special Day!</p>
              </div>
            </div>

            <div className="text-center">
              <p className="mb-4 text-lg text-gray-700">
                Today marks a special chapter — you turn 20. Two decades of life, filled with moments of joy, growth, and resilience. Thank you for being the remarkable woman you are. I'm grateful to know you. Happy birthday!
              </p>

              <Button
                onClick={() => scrollToSection("cake")}
                className="mt-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-2 font-semibold text-white transition-all hover:shadow-lg"
              >
                See Your Birthday Cake
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Bagian kue - moved to be second section */}
        <section id="cake" ref={cakeRef} className="min-h-screen py-20">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-pink-500">Your Birthday Cake</h2>
            <p className="text-gray-600">Click the button to reveal your special birthday surprise!</p>
          </div>

          <div className="h-[400px] w-full">
            <BirthdayCakeGame />
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700">Jangan lupa berdoa, ya! Semoga semua cita-cita dan impianmu bisa terwujud. Aku akan jadi saksi saat semuanya itu jadi nyata, suatu hari nanti.</p>
          </div>
        </section>

        {/* Bagian galeri */}
        <section id="gallery" ref={galleryRef} className="min-h-screen py-20">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-pink-500">Our Memories</h2>
            <p className="text-gray-600">Swipe through our special moments together</p>
          </div>

          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="gallery" className="rounded-full">
                Love Gallery
              </TabsTrigger>
              <TabsTrigger value="cards" className="rounded-full">
                Love Cards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gallery">
              <LoveGallery />
            </TabsContent>

            <TabsContent value="cards">
              <LoveCards />
            </TabsContent>
          </Tabs>
        </section>

        {/* Bagian hitung mundur */}
        <section id="countdown" ref={countdownRef} className="min-h-screen py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white/80 p-6 shadow-lg backdrop-blur-md"
          >
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-3xl font-bold text-pink-500">Birthday Countdown</h2>
              <p className="text-gray-600">Counting down to your special moment</p>
            </div>

            <CountdownTimer targetDate="2025-05-23T08:30:00" />

            <div className="mt-8 text-center">
              <p className="text-lg text-gray-700">
                Every second brings us closer to celebrating another year of your amazing life!
              </p>
            </div>
          </motion.div>
        </section>

        {/* Bagian kenangan */}
        <section id="memory" ref={memoryRef} className="min-h-screen py-20">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-pink-500">Memory Lane</h2>
            <p className="text-gray-600">A journey through your childhood</p>
          </div>

          <MemoryPhotos />
        </section>

        {/* Bagian kejutan */}
        <section id="surprise" ref={surpriseRef} className="min-h-screen py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white/80 p-6 shadow-lg backdrop-blur-md"
          >
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-3xl font-bold text-pink-500">Birthday Surprises</h2>
              <p className="text-gray-600">Special gifts just for you</p>
            </div>

            <div className="grid gap-6">
              <Card className="overflow-hidden border-2 border-pink-200">
                <CardContent className="p-0">
                  <GiftReveal />
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-2 border-pink-200">
                <CardContent className="p-4">
                  <h3 className="mb-4 text-xl font-bold text-pink-500">Heart Tarot Cards</h3>
                  <HeartTarot />
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-2 border-pink-200">
                <CardContent className="p-4">
                  <h3 className="mb-4 text-xl font-bold text-pink-500">Petal Picker</h3>
                  <PetalPicker />
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Bagian permainan */}
        <section id="games" ref={gamesRef} className="min-h-screen py-20">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-pink-500">Birthday Games</h2>
            <p className="text-gray-600">Fun activities to celebrate your special day</p>
          </div>

          <div className="grid gap-8">
            <Card className="overflow-hidden border-2 border-pink-200">
              <CardContent className="p-4">
                <MemoryPuzzle />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bagian fitur romantis */}
        <section id="romantic" className="min-h-screen py-20">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-pink-500">Romantic Features</h2>
            <p className="text-gray-600">Special ways to express my love for you</p>
          </div>

          <div className="grid gap-8">
            <Card className="overflow-hidden border-2 border-pink-200">
              <CardContent className="p-4">
                <LoveReasons />
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
