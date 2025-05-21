import type React from "react"
import type { Metadata } from "next"
import { Baloo_2 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Happy 20th Birthday Mayly!",
  description: "A special birthday greeting for Mayly Winarty Dewi",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${baloo.variable} font-baloo`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
