"use client";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";
const Navbar = dynamic(() => import("./components/Navbar"), { ssr: false })
const Hero = dynamic(() => import("./components/Hero"), { ssr: false })
const AdminPanel = dynamic(() => import("./components/AdminPanel"), { ssr: false })
const TopicCard = dynamic(() => import("./components/TopicCard"), { ssr: false })

const topics = [
  { id: 1, title: "AI Research", description: "Transformer papers, evals, safety", stakers: 42, treasury: "SP3FBR2..." },
  { id: 2, title: "Bitcoin Dev", description: "Core PRs, BIPs, Lightning", stakers: 35, treasury: "SP2J8GK..." },
  { id: 3, title: "Crypto Markets", description: "On-chain alpha, macro flows", stakers: 58, treasury: "SP1H2KQ..." },
  { id: 4, title: "DeFi", description: "Protocols, audits, governance", stakers: 27, treasury: "SP3L9RT..." },
  { id: 5, title: "Startups", description: "Founder threads, fundraising", stakers: 19, treasury: "SP2ABCD..." },
  { id: 6, title: "Design", description: "Product thinking, UX patterns", stakers: 22, treasury: "SP9XYZA..." },
];

export default function Home() {
  const [address, setAddress] = useState<string | undefined>(undefined)
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
      <Navbar onAddress={(addr) => setAddress(addr)} />
      <Hero />
      <section id="topics" className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((t) => (
          <TopicCard key={t.id} topic={t as { id: number; title: string; description: string; stakers: number; treasury: string }} />
        ))}
      </section>
      <AdminPanel address={address} />
      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-500">© CentriFeed</footer>
    </div>
  );
}
