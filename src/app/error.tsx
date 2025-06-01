'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black/60">
      <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
        Oops!
      </h2>
      <p className="mt-4 text-lg md:text-xl text-white/70">
        Something went wrong
      </p>
      <div className="flex gap-4 mt-8">
        <button
          onClick={reset}
          className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}