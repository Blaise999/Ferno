'use client';

import { CRYPTO } from '@/data/crypto';
import { FOREX } from '@/data/forex';

export default function Ticker() {
  const items = [
    ...CRYPTO.slice(0, 8).map(c => ({ s: c.symbol, p: c.price, c: c.change24h })),
    ...FOREX.slice(0, 8).map(f => ({ s: f.pair, p: f.bid, c: f.change24h })),
  ];
  const all = [...items, ...items, ...items];
  return (
    <div className="bg-obsidian border-b border-pearl/[0.04] overflow-hidden relative">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-obsidian to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-obsidian to-transparent z-10" />
      <div className="flex animate-ticker py-2.5 whitespace-nowrap">
        {all.map((t, i) => (
          <div key={i} className="flex items-center gap-2.5 px-7 text-[11px]">
            <span className="text-muted tracking-wide">{t.s}</span>
            <span className="text-pearl font-mono">{typeof t.p === 'number' ? t.p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : t.p}</span>
            <span className={`font-mono ${t.c >= 0 ? 'text-bull' : 'text-bear'}`}>{t.c >= 0 ? '+' : ''}{t.c.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
