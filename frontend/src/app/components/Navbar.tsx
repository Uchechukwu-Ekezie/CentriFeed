"use client"
import dynamic from "next/dynamic"
const ConnectWallet = dynamic(() => import("./ConnectWallet"), { ssr: false })

export default function Navbar({ onAddress }: { onAddress?: (addr: string) => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/50 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-semibold">CentriFeed</div>
        <div className="flex items-center gap-4">
          <a href="#submit" className="hidden md:inline-block px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700">Submit</a>
          <ConnectWallet onAddress={onAddress} />
        </div>
      </div>
    </header>
  )
}
