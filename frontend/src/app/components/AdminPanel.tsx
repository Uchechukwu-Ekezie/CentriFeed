import dynamic from "next/dynamic";
const ContractActions = dynamic(() => import("./ContractActions"), {
  ssr: false,
});

import { useState } from "react";

/**
 * Renders the admin panel, which allows users to interact with the smart contracts.
 * @param address The user's STX address.
 * @returns The AdminPanel component.
 */
export default function AdminPanel({ address }: { address?: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const [manual, setManual] = useState("");
  const active = address || manual.trim() || undefined;
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Controls</h2>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Hide" : "Show"}
          </button>
          <span className="text-sm text-neutral-500">
            {active ? active : "Not connected"}
          </span>
          {!address && (
            <input
              placeholder="Paste STX address"
              value={manual}
              onChange={(e) => setManual(e.target.value)}
              className="px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent"
            />
          )}
        </div>
      </div>
      <div className="mt-6">
        {isOpen && <ContractActions address={active} />}
      </div>
    </section>
  );
}
