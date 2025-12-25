"use client"
import { useState } from "react"

type StxAddr = { mainnet?: string; testnet?: string }
type FinishPayload = { profile?: { stxAddress?: StxAddr } }

export default function ConnectWallet({ onAddress }: { onAddress?: (addr: string) => void }) {
  const [address, setAddress] = useState<string | null>(null)
  const onConnect = () => {
    import("@stacks/connect").then(({ showConnect, AppConfig, UserSession, getUserData }) => {
      const appConfig = new AppConfig([])
      const userSession = new UserSession({ appConfig })
      showConnect({
        appDetails: { name: "CentriFeed", icon: window.location.origin + "/favicon.ico" },
        userSession,
        onFinish: () => {
          const data = getUserData(userSession) as FinishPayload
          const stx = data?.profile?.stxAddress
          const mainnet = stx?.mainnet || stx?.testnet || null
          setAddress(mainnet || null)
          if (mainnet && onAddress) onAddress(mainnet)
        },
      })
    })
  }
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <button onClick={onConnect}>Connect Wallet</button>
      <span>{address ? address : "Not connected"}</span>
    </div>
  )
}
