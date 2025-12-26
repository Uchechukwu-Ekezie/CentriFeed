"use client";
import {
  uintCV,
  ClarityValue,
  standardPrincipalCV,
} from "@stacks/transactions";

const DEPLOYER = "SP2QNSNKR3NRDWNTX0Q7R4T8WGBJ8RE8RA516AKZP";
const contracts = [
  { name: "curation" },
  { name: "tips" },
  { name: "attestations" },
  { name: "reputation" },
  { name: "funding" },
];

async function call(
  contractName: string,
  functionName: string,
  args: ClarityValue[] = []
) {
  const { openContractCall } = await import("@stacks/connect");
  const { createNetwork } = await import("@stacks/network");
  const network = createNetwork("mainnet");
  return openContractCall({
    contractAddress: DEPLOYER,
    contractName,
    functionName,
    functionArgs: args,
    network,
    appDetails: {
      name: "CentriFeed",
      icon: window.location.origin + "/favicon.ico",
    },
    onFinish: () => {},
  });
}

/**
 * Renders a list of contract actions that the user can perform.
 * @param address The user's STX address.
 * @returns The ContractActions component.
 */
export default function ContractActions({ address }: { address?: string }) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {contracts.map((c) => (
        <div
          key={c.name}
          style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}
        >
          <div style={{ fontWeight: 600 }}>{c.name}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              disabled={!address}
              onClick={() =>
                address &&
                call(c.name, "init-admin", [standardPrincipalCV(address)])
              }
            >
              Init Admin
            </button>
            <button onClick={() => call(c.name, "pause")}>Pause</button>
            <button onClick={() => call(c.name, "unpause")}>Unpause</button>
            <button
              disabled={!address}
              onClick={() =>
                address &&
                call(c.name, "transfer-admin", [standardPrincipalCV(address)])
              }
            >
              Transfer Admin
            </button>
            {c.name === "curation" && (
              <button
                onClick={() =>
                  call(c.name, "create-topic", [
                    standardPrincipalCV(address || DEPLOYER),
                    uintCV(100),
                  ])
                }
              >
                Create Topic
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
