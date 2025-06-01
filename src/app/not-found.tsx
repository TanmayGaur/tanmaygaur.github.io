import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
        404
      </h1>
      <p className="mt-4 text-lg md:text-xl text-white/70">
        Oops! Page not found
      </p>
      <Link 
        href="/"
        className="mt-8 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500 transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}