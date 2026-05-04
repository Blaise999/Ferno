# Ferno Limited — Demo

A sample multi-asset trading webapp (FX, crypto, equities) built as a client demo. All data is seeded — no database, no backend, no API keys required.

## Quick start

```bash
pnpm install        # or: npm install / yarn install
pnpm dev            # runs on http://localhost:3000
```

Then open **http://localhost:3000** in your browser.

## Demo credentials

The login form is pre-filled. Just click **Sign in**.

- **Email**: `alex.morgan@ferno-demo.io`
- **Password**: `demo1234`

(Login is fake — any submit routes to the dashboard.)

## What's included

| Page                            | Path                          |
|---------------------------------|-------------------------------|
| Marketing landing                | `/`                          |
| Sign-in                          | `/login`                     |
| Trading console (overview)       | `/dashboard`                 |
| Crypto trade panel               | `/dashboard/trade/crypto`    |
| Forex trade panel                | `/dashboard/trade/fx`        |
| Markets browser                  | `/markets`                   |
| Portfolio breakdown              | `/portfolio`                 |
| Trade history                    | `/history`                   |
| Account settings                 | `/settings`                  |

## Seeded data

All data lives in `/data/`:

- **`crypto.ts`** — 16 cryptocurrencies (BTC, ETH, SOL, BNB, XRP, ADA, DOGE, AVAX, DOT, MATIC, LINK, LTC, ATOM, NEAR, UNI, ARB) with prices, 24h changes, volume, market cap, sparklines.
- **`forex.ts`** — 18 FX pairs (majors, minors, exotics + XAU/XAG metals) with bid/ask, spreads, sparklines.
- **`user.ts`** — Demo user "Alex Morgan" (Hong Kong, Elite tier), $284,632 net assets, 9-asset portfolio, 10 trades (8 closed + 2 open), 8 activity items, 4 notifications, 30-day equity curve, 7-segment allocation.

## Stack

- **Next.js 14** (App Router)
- **React 18** + TypeScript
- **Tailwind CSS** with custom amber/pearl/obsidian palette
- **Framer Motion** for animations
- **Recharts** for charts
- **Lucide** for icons

## Design

Premium fintech editorial:

- **Cormorant Garamond** for serif headlines and italic emphasis
- **Outfit** for display
- **Inter** for body
- **JetBrains Mono** for numerics
- Aurora gradient washes, soft glows, hand-tuned spacing

## Notes for the client

- All numbers are seeded — they don't change between page loads (sparklines compute once at module load).
- No external API calls. No database. Drop it on Vercel and it just works.
- The aesthetic is deliberately editorial: serifs, italics, generous spacing, single accent color.
- Mobile-responsive throughout.

---

© 2026 Ferno Limited (demo)
