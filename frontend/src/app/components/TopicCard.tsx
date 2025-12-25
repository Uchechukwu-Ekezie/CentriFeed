type Topic = { id: number; title: string; description: string; stakers: number; treasury: string }

/**
 * Renders a card that displays information about a topic.
 * @param topic The topic to display.
 * @returns The TopicCard component.
 */
export default function TopicCard({ topic }: { topic: Topic }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 hover:shadow-sm transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{topic.title}</h3>
        <span className="text-sm text-neutral-500">#{topic.id}</span>
      </div>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300 text-sm">{topic.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span>{topic.stakers} stakers</span>
        <span className="truncate max-w-[50%]">{topic.treasury}</span>
      </div>
      <div className="mt-4 flex gap-2">
        <a href="#stake" className="px-3 py-2 rounded-md bg-brand text-white">Stake</a>
        <a href="#submit" className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700">Submit</a>
      </div>
    </div>
  )
}

