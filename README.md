# CentriFeed

**Note:** This project is currently under development.

Bitcoin‑native AI social curation built on Stacks. CentriFeed turns high‑quality links, threads, papers, and videos into on‑chain, community‑curated feeds that reward trustworthy discovery.

## Vision
- Make signal out of the noise: AI assists discovery, communities decide what’s worthy, and the ledger preserves provenance.
- Align incentives: Curators stake `STX`, earn `sBTC` tips and funding when they surface valuable content.
- Portable reputation: Curator scores and content attestations are verifiable on‑chain and usable across apps.

## Why Stacks
- `Clarity` smart contracts: predictable, auditable curation markets and funding mechanisms.
- `sBTC` for BTC‑denominated tips and rewards.
- PoX anchoring: content hashes and attestations secured via Bitcoin settlement.

## Core Features
- On‑chain Curation Staking: stake `STX` into topics; earn proportional rewards from tips and funding rounds.
- Attested Content Registry: store content hashes with source metadata and AI summaries; prevent duplicates and spoofing.
- Soulbound Curator Reputation: non‑transferable score evolves with performance, slashing for manipulation.
- sBTC Tipping and Micro‑grants: anyone can tip posts; DAOs run quadratic funding rounds for topics.
- AI‑Assisted Ranking: LLM‑generated embeddings inform ranking; on‑chain signals gate publication.
- Topic DAOs: governance over curation policies, fees, and treasury.

## Architecture
- Smart Contracts (Clarity):
  - `curation.clar`: topics, stake, submit, vote, reward distribution.
  - `attestations.clar`: registry of content hashes and attestors; dispute/slash.
  - `reputation.clar`: SBT‑style curator reputation with decay and boosts.
  - `funding.clar`: quadratic rounds, matching pools, payout schedules.
  - `tips.clar`: sBTC tips; fee splits among submitter/curators/treasury.
- Off‑chain Services:
  - Ingestion workers: crawl/X/Twitter/YouTube/ArXiv; canonicalize URLs; dedup via hashing.
  - AI pipeline: summaries, embeddings, trust heuristics; publish scores as signed attestations.
  - Indexer: caches contract events, builds feeds, exposes GraphQL/REST.
- Frontend:
  - Feed explorer, topic pages, staking, submit/vote, tips.
  - Wallet integration (Hiro/Leather) for `STX/sBTC` flows.
  - Curator profile with on‑chain reputation and contribution history.

## Data Model (high‑level)
- `Content`: `contentId`, URL, hash, source, author handle, AI summary, embedding.
- `Topic`: `topicId`, metadata, policy, treasury address.
- `Stake`: curator→topic amount, lock period.
- `Submission`: link→topic by curator, bonds, on‑chain status.
- `Vote`: up/down with weight by stake+reputation.
- `Tip`: sBTC amount, split config.
- `Reputation`: score, decay parameters, slashing events.

## Unique Differentiators
- AI attestations are accountable: each score is signed and can be challenged on‑chain.
- Curation markets: stake introduces skin‑in‑the‑game and drives higher signal.
- Portable reputation via SBT: usable by any Stacks app to gate roles or boosts.
- BTC‑denominated incentives with `sBTC`: simple, global value transfer.

## Roadmap
1. Contracts MVP: `curation`, `tips`, `attestations` basic flows.
2. Indexer + Ingestion: link registry, dedup, summaries, embeddings.
3. Frontend Alpha: submit, stake, vote, tip; topic pages.
4. Reputation + Slashing: disputes, penalties, decay.
5. Quadratic Funding: matching pools, payout logic.
6. Topic DAOs: governance, fees, treasury controls.

## Getting Started
This repository currently hosts the product specification. Implementation will be delivered in phases:

### Dev Environment
- Contracts: `clarinet` for local development and testing.
- Indexer/API: `Node.js` + `TypeScript` + `Postgres`.
- Frontend: `Next.js` + `TypeScript` + `Tailwind` + Stacks wallet.

### Setup (planned)
1. Install Clarinet: `curl -sSL https://get.hiro.so/clarinet/install.sh | sh`
2. Scaffold contracts: `clarinet new centrifeed && clarinet contract new curation`
3. Bootstrap API: `pnpm create next-app centrifeed-app --ts`
4. Run localnet: `clarinet integrate start`
5. Connect wallet and test staking/tipping flows.

## Contract Sketches
Pseudo interfaces to guide implementation:

```clarity
;; curation.clar
(define-map topics {id: uint} {treasury: principal, fee-bps: uint})
(define-map stakes {curator: principal, topic: uint} {amount: uint, until: uint})
(define-map submissions {id: uint} {topic: uint, curator: principal, hash: (buff 32)})
(define-map votes {submission: uint, voter: principal} {dir: int, weight: uint})
(define-public (stake (topic uint) (amount uint)) (ok true))
(define-public (submit (topic uint) (hash (buff 32))) (ok u0))
(define-public (vote (submission uint) (dir int)) (ok true))
```

```clarity
;; tips.clar
(define-public (tip (submission uint) (amount uint)) (ok true))
```

```clarity
;; attestations.clar
(define-map content {hash: (buff 32)} {url: (string-ascii 200), attestor: principal})
(define-public (attest (hash (buff 32)) (url (string-ascii 200))) (ok true))
```

## Milestones & Deliverables
- Week 1: Contracts MVP + unit tests.
- Week 2: Indexer/API + ingestion workers.
- Week 3: Frontend Alpha + wallet flows.
- Week 4: Reputation/slashing + quadratic funding.


