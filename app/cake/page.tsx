"use client"

import { BirthdayCake } from "@/components/birthday-cake"

export default function CakePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-pink-500">Your Birthday Cake</h1>
        <p className="text-gray-600">Click the button to reveal your special birthday surprise!</p>
      </div>

      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="aspect-square w-full">
          <BirthdayCake />
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg text-gray-700">May all your dreams come true on this special day!</p>
      </div>
    </div>
  )
}
