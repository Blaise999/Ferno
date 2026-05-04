'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ChevronRight, ArrowUpRight, ArrowDownRight, Bitcoin, DollarSign, BarChart3, History as HistoryIcon, Settings as SettingsIcon, TrendingUp, Send, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { USER, BALANCE, ACTIVITY, PORTFOLIO } from '@/data/user';
import { CRYPTO } from '@/data/crypto';
import { fmtUSD, fmtNum } from '@/lib/format';
import EquityChart from '@/components/charts/EquityChart';
import AllocationPie from '@/components/charts/AllocationPie';
import Sparkline from '@/components/charts/Sparkline';

export default function DashboardOverview() {
  const [hide, setHide] = useState(false);
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';

  const topMovers = [...CRYPTO].sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h)).slice(0, 5);

  return (
    <div className="space-y-10 pb-12 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-3">Console</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-pearl leading-[1.05]">
            Good {greet}, <em className="italic font-medium text-amber-300">{USER.firstName}</em>.
          </h1>
          <p className="text-sm text-muted mt-3">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · Markets open · Hong Kong</p>
        </div>
      </div>

      {/* Balance hero + quick stats */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 relative overflow-hidden rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/70 via-obsidian/80 to-ink p-7 lg:p-9">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-400/[0.10] rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />

          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-medium">Net assets · USD</div>
              <button onClick={() => setHide(!hide)} className="p-1.5 hover:bg-pearl/[0.04] rounded-lg">
                {hide ? <EyeOff className="w-4 h-4 text-muted" /> : <Eye className="w-4 h-4 text-muted" />}
              </button>
            </div>

            <p className="font-serif font-light text-5xl lg:text-6xl text-pearl tracking-tight leading-none">
              {hide ? '$ • • • • • •' : fmtUSD(BALANCE.total)}
            </p>
            <div className="mt-3 flex items-center gap-3 text-[13px]">
              <span className={BALANCE.todayPnl >= 0 ? 'text-bull font-mono' : 'text-bear font-mono'}>
                {BALANCE.todayPnl >= 0 ? '+' : ''}{fmtUSD(BALANCE.todayPnl)}
              </span>
              <span className="text-muted">today · {BALANCE.todayPct >= 0 ? '+' : ''}{BALANCE.todayPct}%</span>
            </div>

            <div className="mt-9 flex flex-wrap gap-2.5">
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-5 py-2.5 bg-pearl hover:bg-amber-100 text-ink font-medium text-sm rounded-full transition-all">
                <CreditCard className="w-3.5 h-3.5" /> Deposit
              </Link>
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-5 py-2.5 border border-pearl/[0.12] hover:border-pearl/[0.25] text-pearl font-medium text-sm rounded-full transition-all">
                <Send className="w-3.5 h-3.5" /> Withdraw
              </Link>
              <Link href="/dashboard/trade/crypto" className="inline-flex items-center gap-2 px-5 py-2.5 border border-pearl/[0.12] hover:border-pearl/[0.25] text-pearl font-medium text-sm rounded-full transition-all">
                <TrendingUp className="w-3.5 h-3.5" /> Trade
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-px bg-pearl/[0.07] rounded-[20px] overflow-hidden border border-pearl/[0.07]">
          <Stat label="Available" value={fmtUSD(BALANCE.available)} sub="Ready to trade" tint="text-pearl" />
          <Stat label="In open trades" value={fmtUSD(BALANCE.locked)} sub="Margin allocated" tint="text-pearl" />
          <Stat label="This week" value={`+${fmtUSD(BALANCE.weekPnl)}`} sub="Realized + unrealized" tint="text-bull" />
        </div>
      </motion.div>

      {/* Equity curve + allocation */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 font-medium mb-1">Performance</p>
              <h2 className="font-serif text-xl text-pearl font-light tracking-tight">Equity curve · 30 days</h2>
            </div>
            <div className="flex gap-2">
              {['7D', '30D', '3M', 'YTD'].map((p, i) => (
                <button key={p} className={`px-2.5 py-1 text-[11px] rounded ${i === 1 ? 'bg-pearl/10 text-pearl' : 'text-muted hover:text-pearl'}`}>{p}</button>
              ))}
            </div>
          </div>
          <EquityChart />
        </div>

        <div className="lg:col-span-4 rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 font-medium mb-1">Allocation</p>
          <h2 className="font-serif text-xl text-pearl font-light tracking-tight mb-3">Portfolio mix</h2>
          <AllocationPie />
        </div>
      </div>

      {/* Top movers */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 font-medium mb-2">Markets</p>
            <h2 className="font-serif text-2xl text-pearl font-light tracking-tight">Top movers</h2>
          </div>
          <Link href="/markets" className="text-[12px] text-muted hover:text-pearl flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-pearl/[0.07] rounded-[20px] overflow-hidden border border-pearl/[0.07]">
          {topMovers.map(m => (
            <Link key={m.symbol} href="/dashboard/trade/crypto" className="bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-5 hover:from-charcoal/70 transition-colors group">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="relative w-8 h-8 rounded-full bg-pearl/[0.04] border border-pearl/[0.06] overflow-hidden">
                  <Image src={m.logo} alt={m.symbol} fill className="object-contain p-1.5" />
                </div>
                <div className="text-pearl font-medium text-sm">{m.symbol}</div>
                <ArrowUpRight className="ml-auto w-3 h-3 text-muted group-hover:text-amber-300 transition-colors" />
              </div>
              <div className="font-mono text-pearl text-base">${fmtNum(m.price)}</div>
              <div className={`text-[11px] font-mono mt-0.5 ${m.change24h >= 0 ? 'text-bull' : 'text-bear'}`}>
                {m.change24h >= 0 ? '+' : ''}{m.change24h.toFixed(2)}% · 24h
              </div>
              <div className="mt-2.5"><Sparkline data={m.spark} up={m.change24h >= 0} width={140} height={24} /></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Activity + Holdings */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 overflow-hidden">
          <div className="px-7 py-5 border-b border-pearl/[0.07] flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 font-medium mb-1">Activity</p>
              <div className="font-serif text-xl text-pearl font-light tracking-tight">Recent</div>
            </div>
            <Link href="/history" className="text-[12px] text-muted hover:text-pearl flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></Link>
          </div>
          <div className="divide-y divide-pearl/[0.05]">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="px-7 py-4 flex items-center gap-4 hover:bg-pearl/[0.02] transition-colors">
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${
                  a.type === 'profit' ? 'border-bull/30 bg-bull/[0.06] text-bull' :
                  a.type === 'loss'   ? 'border-bear/30 bg-bear/[0.06] text-bear' :
                  a.type === 'in'     ? 'border-amber-300/30 bg-amber-300/[0.06] text-amber-300' :
                  a.type === 'bonus'  ? 'border-amber-300/30 bg-amber-300/[0.06] text-amber-300' :
                  a.type === 'out'    ? 'border-pearl/[0.10] bg-pearl/[0.02] text-pearl/70' :
                                        'border-pearl/[0.10] bg-pearl/[0.02] text-pearl/70'
                }`}>
                  {a.amount >= 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-pearl font-medium truncate">{a.label}</div>
                  <div className="text-[11px] text-muted truncate">{a.sub}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-mono ${a.amount > 0 && (a.type === 'profit' || a.type === 'bonus' || a.type === 'in') ? 'text-bull' : a.amount < 0 ? 'text-bear' : 'text-pearl/80'}`}>
                    {a.amount > 0 ? '+' : ''}{fmtUSD(Math.abs(a.amount))}
                  </div>
                  <div className="text-[10px] text-muted/70 mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 overflow-hidden">
          <div className="px-7 py-5 border-b border-pearl/[0.07] flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 font-medium mb-1">Holdings</p>
              <div className="font-serif text-xl text-pearl font-light tracking-tight">Your assets</div>
            </div>
            <Link href="/portfolio" className="text-[12px] text-muted hover:text-pearl flex items-center gap-1">All <ChevronRight className="w-3 h-3" /></Link>
          </div>
          <div className="divide-y divide-pearl/[0.05]">
            {PORTFOLIO.slice(0, 6).map(p => {
              const value = p.qty * p.price;
              const pnl = (p.price - p.cost) * p.qty;
              const pnlPct = p.cost > 0 ? ((p.price - p.cost) / p.cost) * 100 : 0;
              return (
                <div key={p.symbol} className="px-7 py-3.5 flex items-center gap-3 hover:bg-pearl/[0.02]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300/30 to-amber-600/30 border border-pearl/[0.06] flex items-center justify-center text-[10px] font-mono text-pearl flex-shrink-0">
                    {p.symbol.slice(0, 3)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-pearl font-medium">{p.symbol}</div>
                    <div className="text-[11px] text-muted font-mono">{p.qty} · ${fmtNum(p.price)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-pearl">{fmtUSD(value)}</div>
                    <div className={`text-[10px] font-mono ${pnl >= 0 ? 'text-bull' : 'text-bear'}`}>
                      {pnl >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-pearl/[0.07] rounded-[20px] overflow-hidden border border-pearl/[0.07]">
          {[
            { l: 'Trade crypto', h: '/dashboard/trade/crypto', i: Bitcoin },
            { l: 'Trade forex',  h: '/dashboard/trade/fx',     i: DollarSign },
            { l: 'Markets',      h: '/markets',                i: TrendingUp },
            { l: 'History',      h: '/history',                i: HistoryIcon },
          ].map(link => (
            <Link key={link.l} href={link.h} className="bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-5 hover:from-charcoal/70 transition-colors flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <link.i className="w-4 h-4 text-muted group-hover:text-amber-300 transition-colors" strokeWidth={1.75} />
                <span className="text-sm text-pearl font-medium">{link.l}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted group-hover:text-pearl group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, sub, tint = 'text-pearl' }: { label: string; value: string; sub: string; tint?: string }) {
  return (
    <div className="bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-5 lg:p-6 hover:from-charcoal/60 transition-colors">
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted mb-2">{label}</div>
      <div className={`font-serif text-2xl font-light tracking-tight ${tint}`}>{value}</div>
      <div className="text-[11px] text-muted mt-1">{sub}</div>
    </div>
  );
}
