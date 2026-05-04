'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowUpRight, TrendingUp } from 'lucide-react';
import { CRYPTO } from '@/data/crypto';
import { FOREX } from '@/data/forex';
import { fmtNum, fmtCompact } from '@/lib/format';
import Sparkline from '@/components/charts/Sparkline';
import Nav from '@/components/landing/Nav';

export default function Markets() {
  const [tab, setTab] = useState<'crypto' | 'forex'>('crypto');
  const [q, setQ] = useState('');

  const cryptoFiltered = useMemo(
    () => CRYPTO.filter(c => c.symbol.toLowerCase().includes(q.toLowerCase()) || c.name.toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  const forexFiltered = useMemo(
    () => FOREX.filter(f => f.pair.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <main className="min-h-screen bg-ink text-pearl">
      <Nav />

      <section className="max-w-[1280px] mx-auto px-6 sm:px-8 pt-16 pb-8">
        <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-5">Markets</p>
        <h1 className="font-serif text-5xl md:text-6xl text-pearl font-light tracking-tight leading-[1.05]">
          Every market we <em className="italic font-medium text-amber-300">offer.</em>
        </h1>
        <p className="mt-5 text-pearl/65 max-w-xl">Live prices across {CRYPTO.length} digital assets and {FOREX.length} foreign exchange pairs. Click any row to start trading.</p>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 sm:px-8 pb-24">
        {/* Tabs + search */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-pearl/[0.07] mb-6">
          <div className="flex">
            {[
              { id: 'crypto', label: 'Digital assets', count: CRYPTO.length },
              { id: 'forex',  label: 'Foreign exchange', count: FOREX.length },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id as any)}
                className={`relative px-5 py-3 text-sm font-medium transition-colors ${tab === t.id ? 'text-pearl' : 'text-muted hover:text-pearl/80'}`}>
                <span>{t.label}</span>
                <span className={`ml-2 text-[10px] ${tab === t.id ? 'text-muted' : 'text-muted/50'}`}>{t.count}</span>
                {tab === t.id && <span className="absolute -bottom-px left-0 right-0 h-px bg-amber-300" />}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 bg-pearl/[0.03] rounded-full border border-pearl/[0.06] mb-2">
            <Search className="w-3.5 h-3.5 text-muted" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search markets…"
              className="bg-transparent text-[13px] text-pearl placeholder:text-muted/60 focus:outline-none w-44 lg:w-60" />
          </div>
        </div>

        {/* Tables */}
        {tab === 'crypto' ? (
          <div className="border border-pearl/[0.06] rounded-2xl overflow-hidden bg-charcoal/30">
            <div className="grid grid-cols-12 px-6 py-3 text-[10px] uppercase tracking-wider text-muted/70 border-b border-pearl/[0.06]">
              <div className="col-span-4">Asset</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">24h %</div>
              <div className="hidden md:block md:col-span-2 text-right">Market cap</div>
              <div className="hidden md:block md:col-span-1 text-right">24h Vol</div>
              <div className="col-span-2 md:col-span-1 text-right">Trade</div>
            </div>
            {cryptoFiltered.map(r => (
              <Link key={r.symbol} href="/dashboard/trade/crypto" className="grid grid-cols-12 px-6 py-4 border-b border-pearl/[0.04] last:border-0 hover:bg-pearl/[0.02] group items-center">
                <div className="col-span-4 flex items-center gap-3 min-w-0">
                  <div className="relative w-9 h-9 rounded-full bg-pearl/[0.04] border border-pearl/[0.06] overflow-hidden flex-shrink-0">
                    <Image src={r.logo} alt={r.symbol} fill className="object-contain p-1.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-pearl truncate">{r.symbol}</div>
                    <div className="text-xs text-muted truncate">{r.name}</div>
                  </div>
                </div>
                <div className="col-span-2 text-right font-mono text-pearl text-sm">${fmtNum(r.price)}</div>
                <div className={`col-span-2 text-right font-mono text-sm ${r.change24h >= 0 ? 'text-bull' : 'text-bear'}`}>{r.change24h >= 0 ? '+' : ''}{r.change24h.toFixed(2)}%</div>
                <div className="hidden md:block md:col-span-2 text-right text-muted text-sm font-mono">{fmtCompact(r.marketCap)}</div>
                <div className="hidden md:block md:col-span-1 text-right text-muted text-sm font-mono">{fmtCompact(r.volume24h)}</div>
                <div className="col-span-2 md:col-span-1 text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted/60 group-hover:text-amber-300 transition-colors">
                    Trade <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-pearl/[0.06] rounded-2xl overflow-hidden bg-charcoal/30">
            <div className="grid grid-cols-12 px-6 py-3 text-[10px] uppercase tracking-wider text-muted/70 border-b border-pearl/[0.06]">
              <div className="col-span-3">Pair</div>
              <div className="col-span-2 text-right">Bid</div>
              <div className="col-span-2 text-right">Ask</div>
              <div className="col-span-2 text-right">24h %</div>
              <div className="hidden md:block md:col-span-1 text-right">Spread</div>
              <div className="hidden md:block md:col-span-1 text-right">Spark</div>
              <div className="col-span-3 md:col-span-1 text-right">Trade</div>
            </div>
            {forexFiltered.map(r => (
              <Link key={r.pair} href="/dashboard/trade/fx" className="grid grid-cols-12 px-6 py-4 border-b border-pearl/[0.04] last:border-0 hover:bg-pearl/[0.02] group items-center">
                <div className="col-span-3 flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300/30 to-amber-600/30 border border-pearl/[0.06] flex items-center justify-center text-[10px] font-mono text-pearl flex-shrink-0">{r.base}</div>
                  <div className="min-w-0">
                    <div className="font-medium text-pearl truncate">{r.pair}</div>
                    <div className="text-xs text-muted capitalize">{r.category}</div>
                  </div>
                </div>
                <div className="col-span-2 text-right font-mono text-bear text-sm">{r.bid.toFixed(r.bid < 10 ? 5 : 3)}</div>
                <div className="col-span-2 text-right font-mono text-bull text-sm">{r.ask.toFixed(r.ask < 10 ? 5 : 3)}</div>
                <div className={`col-span-2 text-right font-mono text-sm ${r.change24h >= 0 ? 'text-bull' : 'text-bear'}`}>{r.change24h >= 0 ? '+' : ''}{r.change24h.toFixed(2)}%</div>
                <div className="hidden md:block md:col-span-1 text-right text-muted text-sm font-mono">{r.spread}p</div>
                <div className="hidden md:flex md:col-span-1 justify-end items-center"><Sparkline data={r.spark} up={r.change24h >= 0} width={70} height={22} /></div>
                <div className="col-span-3 md:col-span-1 text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted/60 group-hover:text-amber-300 transition-colors">
                    Trade <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
