'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import { TRADES } from '@/data/user';
import { fmtUSD, fmtNum } from '@/lib/format';

export default function HistoryPage() {
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [side, setSide] = useState<'all' | 'long' | 'short'>('all');

  const filtered = useMemo(() => {
    return TRADES.filter(t =>
      (filter === 'all' || t.status === filter) &&
      (side === 'all' || t.side === side)
    );
  }, [filter, side]);

  const closedTrades = TRADES.filter(t => t.status === 'closed');
  const winRate = closedTrades.length > 0
    ? (closedTrades.filter(t => t.pnl > 0).length / closedTrades.length) * 100
    : 0;
  const totalPnL = closedTrades.reduce((s, t) => s + t.pnl, 0);

  return (
    <main className="min-h-screen bg-ink text-pearl">
      <Nav />

      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 pt-16 pb-12">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-[12px] text-muted hover:text-pearl mb-6">
          <ArrowLeft className="w-3 h-3" /> Back to console
        </Link>
        <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-5">History</p>
        <h1 className="font-serif text-5xl md:text-6xl text-pearl font-light tracking-tight leading-[1.05]">
          Every <em className="italic font-medium text-amber-300">trade</em>, on the record.
        </h1>

        {/* Summary */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-pearl/[0.07] rounded-2xl overflow-hidden border border-pearl/[0.07]">
          <Stat label="Total trades" value={String(TRADES.length)} sub={`${closedTrades.length} closed · ${TRADES.filter(t => t.status === 'open').length} open`} />
          <Stat label="Win rate" value={`${winRate.toFixed(1)}%`} sub={`${closedTrades.filter(t => t.pnl > 0).length} winners`} tint="text-bull" />
          <Stat label="Realized P&L" value={fmtUSD(totalPnL)} sub="From closed positions" tint={totalPnL >= 0 ? 'text-bull' : 'text-bear'} />
          <Stat label="Best trade" value={`+${Math.max(...closedTrades.map(t => t.pnlPct)).toFixed(2)}%`} sub="NEAR/USDT long" tint="text-bull" />
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 pb-24">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="flex items-center gap-2 text-[11px] text-muted">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </div>
          <div className="flex gap-1 p-1 bg-pearl/[0.03] rounded-lg">
            {(['all', 'open', 'closed'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-[11px] rounded capitalize ${filter === f ? 'bg-pearl/10 text-pearl' : 'text-muted hover:text-pearl'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted ml-2">
            <span>Side:</span>
          </div>
          <div className="flex gap-1 p-1 bg-pearl/[0.03] rounded-lg">
            {(['all', 'long', 'short'] as const).map(s => (
              <button key={s} onClick={() => setSide(s)}
                className={`px-3 py-1.5 text-[11px] rounded capitalize ${side === s ? 'bg-pearl/10 text-pearl' : 'text-muted hover:text-pearl'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Trades table */}
        <div className="rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 overflow-hidden">
          <div className="grid grid-cols-12 px-7 py-3 text-[10px] uppercase tracking-wider text-muted/70 border-b border-pearl/[0.05]">
            <div className="col-span-2">Order ID</div>
            <div className="col-span-2">Pair</div>
            <div className="col-span-1">Side</div>
            <div className="col-span-1 text-right">Size</div>
            <div className="col-span-1 text-right">Entry</div>
            <div className="col-span-1 text-right">Exit</div>
            <div className="col-span-2 text-right">P&L</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-1 text-right">Closed</div>
          </div>
          {filtered.map(t => (
            <div key={t.id} className="grid grid-cols-12 px-7 py-4 border-b border-pearl/[0.04] last:border-0 hover:bg-pearl/[0.02] items-center text-sm">
              <div className="col-span-2 font-mono text-[11px] text-muted">{t.id}</div>
              <div className="col-span-2 text-pearl font-medium">{t.pair}</div>
              <div className="col-span-1">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${t.side === 'long' ? 'bg-bull/15 text-bull' : 'bg-bear/15 text-bear'}`}>
                  {t.side === 'long' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {t.side}
                </span>
              </div>
              <div className="col-span-1 text-right font-mono text-pearl/85">{t.size}</div>
              <div className="col-span-1 text-right font-mono text-muted">${fmtNum(t.entry)}</div>
              <div className="col-span-1 text-right font-mono text-pearl/85">{t.exit !== null ? `$${fmtNum(t.exit)}` : '—'}</div>
              <div className="col-span-2 text-right">
                <div className={`font-mono ${t.pnl >= 0 ? 'text-bull' : 'text-bear'}`}>
                  {t.pnl >= 0 ? '+' : ''}{fmtUSD(t.pnl)}
                </div>
                <div className="text-[10px] text-muted">{t.pnlPct >= 0 ? '+' : ''}{t.pnlPct.toFixed(2)}%</div>
              </div>
              <div className="col-span-1 text-center">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] capitalize ${t.status === 'open' ? 'bg-amber-300/10 text-amber-300 border border-amber-300/20' : 'bg-pearl/[0.04] text-muted border border-pearl/[0.08]'}`}>
                  {t.status}
                </span>
              </div>
              <div className="col-span-1 text-right text-[10px] text-muted/70 font-mono truncate">{t.closed ? t.closed.split(' ')[0] : 'Active'}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, sub, tint = 'text-pearl' }: { label: string; value: string; sub: string; tint?: string }) {
  return (
    <div className="bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-6">
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted mb-2">{label}</div>
      <div className={`font-serif text-2xl lg:text-3xl font-light tracking-tight ${tint}`}>{value}</div>
      <div className="text-[11px] text-muted mt-1">{sub}</div>
    </div>
  );
}
