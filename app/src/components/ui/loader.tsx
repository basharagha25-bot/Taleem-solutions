import React from 'react'
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={cn("w-10 h-10", className)}
    >
      {/* Abstract Hexagon/Cube representation matching the logo colors */}
      <path d="M50 20 L80 35 V65 L50 80 L20 65 V35 Z" fill="#2B7DDA" className="opacity-10" />
      <path d="M50 50 L50 20 L80 35 L50 50" fill="#F39A23" />
      <path d="M50 50 L80 35 V65 L50 50" fill="#D1326B" />
      <path d="M50 50 V80 L20 65 L50 50" fill="#2B7DDA" />
      <path d="M50 50 L20 65 V35 L50 50" fill="#53A3FF" />
    </svg>
  )
}

export function BounceLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-bounce-logo">
          <Logo className="w-24 h-24" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-primary">TAALAM</h2>
          <span className="text-sm font-medium tracking-[0.3em] text-secondary">SOLUTIONS</span>
        </div>
      </div>
    </div>
  )
}
