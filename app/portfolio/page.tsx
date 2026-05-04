'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowLeft, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import { PORTFOLIO, BALANCE, USER, ALLOCATION } from '@/data/user';
import { fmtUSD, fmtNum, fmtPct } from '@/lib/format';
import AllocationPie from '@/components/charts/AllocationPie';
import EquityChart from '@/components/charts/EquityChart';

export default function PortfolioPage() {
  const totalValue = PORTFOLIO.reduce((s, p) => s + p.qty * p.price, 0);
  const totalCost = PORTFOLIO.reduce((s, p) => s + p.qty * p.cost, 0);
  const totalPnl = totalValue - totalCost;
  const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;

  return (
    <main className="min-h-screen bg-ink text-pearl">
      <Nav />

      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 pt-16 pb-12">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-[12px] text-muted hover:text-pearl mb-6">
          <ArrowLeft className="w-3 h-3" /> Back to console
        </Link>
        <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-5">Portfolio</p>
        <h1 className="font-serif text-5xl md:text-6xl text-pearl font-light tracking-tight leading-[1.05]">
          Your <em className="italic font-medium text-amber-300">capital</em>, accounted for.
        </h1>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-pearl/[0.07] rounded-2xl overflow-hidden border border-pearl/[0.07]">
          <Stat label="Total value"        value={fmtUSD(totalValue + 24800)} sub={`Across ${PORTFOLIO.length} assets`} />
          <Stat label="Total cost basis"   value={fmtUSD(totalCost + 24800)} sub="What you paid" />
          <Stat label="Unrealized P&L"     value={fmtUSD(totalPnl)} sub={fmtPct(totalPnlPct)} tint={totalPnl >= 0 ? 'text-bull' : 'text-bear'} />
          <Stat label="Realized this month" value={fmtUSD(BALANCE.monthPnl)} sub="From closed trades" tint="text-bull" />
        </div>
      </section>

      {/* Charts */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 mb-10">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 font-medium mb-1">Performance</p>
            <h2 className="font-serif text-xl text-pearl font-light tracking-tight mb-5">Equity curve · 30 days</h2>
            <EquityChart />
          </div>
          <div className="lg:col-span-4 rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 font-medium mb-1">Allocation</p>
            <h2 className="font-serif text-xl text-pearl font-light tracking-tight mb-3">Mix</h2>
            <AllocationPie />
            <div className="mt-3 space-y-2">
              {ALLOCATION.map(a => (
                <div key={a.name} className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                    <span className="text-pearl/85">{a.name}</span>
                  </div>
                  <span className="text-muted font-mono">{fmtUSD(a.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Holdings table */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 pb-24">
        <div className="rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 overflow-hidden">
          <div className="px-7 py-5 border-b border-pearl/[0.07]">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 font-medium mb-1">Holdings</p>
            <h2 className="font-serif text-xl text-pearl font-light tracking-tight">All assets</h2>
          </div>
          <div className="grid grid-cols-12 px-7 py-3 text-[10px] uppercase tracking-wider text-muted/70 border-b border-pearl/[0.05]">
            <div className="col-span-3">Asset</div>
            <div className="col-span-2 text-right">Quantity</div>
            <div className="col-span-2 text-right">Avg cost</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Value</div>
            <div className="col-span-1 text-right">P&L</div>
          </div>
          {PORTFOLIO.map(p => {
            const value = p.qty * p.price;
            const pnl = (p.price - p.cost) * p.qty;
            const pnlPct = p.cost > 0 ? ((p.price - p.cost) / p.cost) * 100 : 0;
            return (
              <div key={p.symbol} className="grid grid-cols-12 px-7 py-4 border-b border-pearl/[0.04] last:border-0 hover:bg-pearl/[0.02] items-center">
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300/30 to-amber-600/30 border border-pearl/[0.06] flex items-center justify-center text-[11px] font-mono text-pearl">{p.symbol.slice(0, 4)}</div>
                  <div>
                    <div className="text-sm text-pearl font-medium">{p.symbol}</div>
                    <div className="text-[11px] text-muted">{p.allocPct}% of portfolio</div>
                  </div>
                </div>
                <div className="col-span-2 text-right font-mono text-pearl/85 text-sm">{p.qty}</div>
                <div className="col-span-2 text-right font-mono text-muted text-sm">${fmtNum(p.cost)}</div>
                <div className="col-span-2 text-right font-mono text-pearl text-sm">${fmtNum(p.price)}</div>
                <div className="col-span-2 text-right font-mono text-pearl text-sm">{fmtUSD(value)}</div>
                <div className={`col-span-1 text-right text-sm font-mono ${pnl >= 0 ? 'text-bull' : 'text-bear'}`}>
                  {pnl >= 0 ? '+' : ''}{pnlPct.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, sub, tint = 'text-pearl' }: { label: string; value: string; sub: string; tint?: string }) {
  return (
    <div className="bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-6 hover:from-charcoal/60 transition-colors">
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted mb-2">{label}</div>
      <div className={`font-serif text-2xl lg:text-3xl font-light tracking-tight ${tint}`}>{value}</div>
      <div className="text-[11px] text-muted mt-1">{sub}</div>
    </div>
  );
}
