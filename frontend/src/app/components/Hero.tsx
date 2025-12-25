/**
 * Renders the hero section of the page.
 * @returns The Hero component.
 */
export default function Hero() {
  return (
    <section className="bg-hero pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Bitcoin‑native AI Social Curation</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-300 text-lg">
          Stake, submit, and tip to build trustworthy feeds. Verified on Stacks, settled on Bitcoin.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="#topics" className="px-5 py-3 rounded-md bg-brand text-white">Explore Topics</a>
          <a href="#submit" className="px-5 py-3 rounded-md border border-neutral-300 dark:border-neutral-700">Submit Link</a>
        </div>
      </div>
    </section>
  )
}

