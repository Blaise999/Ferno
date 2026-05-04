'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { CRYPTO } from '@/data/crypto';
import { fmtNum, fmtUSD, fmtCompact } from '@/lib/format';
import { BALANCE, TRADES } from '@/data/user';
import TradeChart from '@/components/charts/TradeChart';
import Sparkline from '@/components/charts/Sparkline';

export default function CryptoTrade() {
  const [active, setActive] = useState(CRYPTO[0]);
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('500');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');

  const openTrades = TRADES.filter(t => t.status === 'open' && (t.pair.startsWith(active.symbol) || t.pair.includes('USDT')));

  return (
    <div className="space-y-5 max-w-[1500px]">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-3">Spot · Crypto</p>
          <h1 className="font-serif text-3xl text-pearl font-light tracking-tight">Digital assets</h1>
        </div>
      </div>

      {/* Asset selector strip */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {CRYPTO.slice(0, 8).map(c => (
          <button
            key={c.symbol}
            onClick={() => setActive(c)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all flex-shrink-0 ${
              active.symbol === c.symbol
                ? 'bg-pearl/[0.06] border-amber-300/30 text-pearl'
                : 'bg-pearl/[0.02] border-pearl/[0.06] text-muted hover:text-pearl'
            }`}
          >
            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-pearl/[0.04]">
              <Image src={c.logo} alt={c.symbol} fill className="object-contain p-0.5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">{c.symbol}</div>
              <div className={`text-[10px] font-mono ${c.change24h >= 0 ? 'text-bull' : 'text-bear'}`}>
                {c.change24h >= 0 ? '+' : ''}{c.change24h.toFixed(2)}%
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-12 gap-5">
        {/* Chart + stats */}
        <div className="lg:col-span-8 rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-6">
          {/* Asset header */}
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full bg-pearl/[0.04] border border-pearl/[0.06] overflow-hidden">
                <Image src={active.logo} alt={active.symbol} fill className="object-contain p-2" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-2xl text-pearl font-medium tracking-tight">{active.pair}</h2>
                  <span className="text-xs text-muted">{active.name}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-serif text-3xl text-pearl font-light tracking-tight">${fmtNum(active.price)}</span>
                  <span className={`text-sm font-mono ${active.change24h >= 0 ? 'text-bull' : 'text-bear'}`}>
                    {active.change24h >= 0 ? '+' : ''}{active.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 text-right">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted">24h High</div>
                <div className="text-sm text-pearl font-mono mt-0.5">${fmtNum(active.high24h)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted">24h Low</div>
                <div className="text-sm text-pearl font-mono mt-0.5">${fmtNum(active.low24h)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted">24h Vol</div>
                <div className="text-sm text-pearl font-mono mt-0.5">{fmtCompact(active.volume24h)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted">Market cap</div>
                <div className="text-sm text-pearl font-mono mt-0.5">{fmtCompact(active.marketCap)}</div>
              </div>
            </div>
          </div>

          {/* Chart timeframe tabs */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
              {['1H', '4H', '1D', '1W', '1M'].map((t, i) => (
                <button key={t} className={`px-3 py-1 text-[11px] rounded ${i === 2 ? 'bg-pearl/10 text-pearl' : 'text-muted hover:text-pearl'}`}>{t}</button>
              ))}
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-bull animate-pulse" /> Live</span>
            </div>
          </div>

          <TradeChart data={active.spark} up={active.change24h >= 0} />
        </div>

        {/* Order ticket */}
        <div className="lg:col-span-4 space-y-4">
          {/* Order ticket */}
          <div className="rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-6">
            <div className="grid grid-cols-2 gap-1 p-1 bg-pearl/[0.03] rounded-xl mb-5">
              <button onClick={() => setSide('buy')} className={`py-2.5 rounded-lg text-sm font-medium transition-all ${side === 'buy' ? 'bg-bull/15 text-bull border border-bull/30' : 'text-muted'}`}>
                <TrendingUp className="w-3.5 h-3.5 inline mr-1.5" /> Buy / Long
              </button>
              <button onClick={() => setSide('sell')} className={`py-2.5 rounded-lg text-sm font-medium transition-all ${side === 'sell' ? 'bg-bear/15 text-bear border border-bear/30' : 'text-muted'}`}>
                <TrendingDown className="w-3.5 h-3.5 inline mr-1.5" /> Sell / Short
              </button>
            </div>

            <div className="flex gap-1 mb-4 text-[11px]">
              {(['market', 'limit'] as const).map(t => (
                <button key={t} onClick={() => setOrderType(t)} className={`px-3 py-1.5 rounded ${orderType === t ? 'bg-pearl/10 text-pearl' : 'text-muted hover:text-pearl'} capitalize`}>{t}</button>
              ))}
            </div>

            <div className="space-y-3">
              {orderType === 'limit' && (
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted">Limit price</label>
                  <div className="mt-1.5 relative">
                    <input type="text" defaultValue={active.price.toFixed(2)} className="w-full px-4 py-3 pr-14 bg-pearl/[0.03] border border-pearl/[0.10] rounded-xl text-pearl text-sm font-mono focus:outline-none focus:border-amber-300/40 transition-colors" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-muted">USDT</span>
                  </div>
                </div>
              )}

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted">Amount (USDT)</label>
                <div className="mt-1.5 relative">
                  <input type="text" value={amount} onChange={e => setAmount(e.target.value)}
                    className="w-full px-4 py-3 pr-14 bg-pearl/[0.03] border border-pearl/[0.10] rounded-xl text-pearl text-sm font-mono focus:outline-none focus:border-amber-300/40 transition-colors" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-muted">USDT</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {[25, 50, 75, 100].map(p => (
                  <button key={p} onClick={() => setAmount(String(BALANCE.available * p / 100))}
                    className="py-1.5 text-[11px] rounded-md border border-pearl/[0.10] text-muted hover:text-pearl hover:border-pearl/[0.20] transition-colors">
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-pearl/[0.06] space-y-2 text-[12px]">
              <Row k="You'll receive" v={`${(parseFloat(amount || '0') / active.price).toFixed(6)} ${active.symbol}`} />
              <Row k="Fee (0.10%)"   v={`${fmtUSD(parseFloat(amount || '0') * 0.001)}`} />
              <Row k="Available"     v={fmtUSD(BALANCE.available)} />
            </div>

            <button className={`w-full mt-5 py-3.5 rounded-xl text-sm font-semibold transition-all ${
              side === 'buy' ? 'bg-bull hover:bg-bull/90 text-white' : 'bg-bear hover:bg-bear/90 text-white'
            }`}>
              {side === 'buy' ? `Buy ${active.symbol}` : `Sell ${active.symbol}`}
            </button>
          </div>

          {/* Order book */}
          <div className="rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 font-medium mb-3">Order book</div>
            <div className="grid grid-cols-3 text-[10px] uppercase tracking-wider text-muted/70 pb-2 border-b border-pearl/[0.06]">
              <div>Price (USDT)</div>
              <div className="text-right">Size</div>
              <div className="text-right">Total</div>
            </div>
            <div className="py-2 text-[11px] font-mono">
              {/* Asks */}
              {[5, 4, 3, 2, 1].map(i => {
                const p = active.price + active.price * 0.0008 * i;
                const sz = (Math.random() * 2 + 0.1).toFixed(3);
                return (
                  <div key={`a-${i}`} className="grid grid-cols-3 py-1 relative">
                    <div className="absolute inset-y-0 right-0 bg-bear/[0.06]" style={{ width: `${i * 18}%` }} />
                    <div className="text-bear relative z-10">{p.toFixed(2)}</div>
                    <div className="text-right text-pearl/80 relative z-10">{sz}</div>
                    <div className="text-right text-muted relative z-10">{(parseFloat(sz) * p).toFixed(2)}</div>
                  </div>
                );
              })}
              <div className="grid grid-cols-3 py-2 border-y border-pearl/[0.06] bg-pearl/[0.02] my-1">
                <div className={`font-medium ${active.change24h >= 0 ? 'text-bull' : 'text-bear'}`}>{active.price.toFixed(2)}</div>
                <div className="text-right text-muted text-[10px]">Last</div>
                <div className="text-right text-muted text-[10px]">{active.change24h >= 0 ? '+' : ''}{active.change24h.toFixed(2)}%</div>
              </div>
              {/* Bids */}
              {[1, 2, 3, 4, 5].map(i => {
                const p = active.price - active.price * 0.0008 * i;
                const sz = (Math.random() * 2 + 0.1).toFixed(3);
                return (
                  <div key={`b-${i}`} className="grid grid-cols-3 py-1 relative">
                    <div className="absolute inset-y-0 right-0 bg-bull/[0.06]" style={{ width: `${(6 - i) * 16}%` }} />
                    <div className="text-bull relative z-10">{p.toFixed(2)}</div>
                    <div className="text-right text-pearl/80 relative z-10">{sz}</div>
                    <div className="text-right text-muted relative z-10">{(parseFloat(sz) * p).toFixed(2)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Open positions */}
      <div className="rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 overflow-hidden">
        <div className="px-6 py-4 border-b border-pearl/[0.07] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="font-serif text-lg text-pearl font-light tracking-tight">Open positions</h3>
            <span className="text-[11px] text-muted">{openTrades.length} active</span>
          </div>
        </div>
        <div className="grid grid-cols-7 px-6 py-3 text-[10px] uppercase tracking-wider text-muted/70 border-b border-pearl/[0.05]">
          <div>Pair</div>
          <div>Side</div>
          <div>Size</div>
          <div>Entry</div>
          <div>Mark</div>
          <div className="text-right">PnL</div>
          <div className="text-right">Action</div>
        </div>
        {openTrades.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted text-sm">No open positions on {active.symbol}.</div>
        ) : (
          openTrades.map(t => (
            <div key={t.id} className="grid grid-cols-7 px-6 py-4 border-b border-pearl/[0.04] last:border-0 hover:bg-pearl/[0.02] transition-colors items-center">
              <div className="text-pearl font-medium text-sm">{t.pair}</div>
              <div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${t.side === 'long' ? 'bg-bull/15 text-bull' : 'bg-bear/15 text-bear'}`}>
                  {t.side === 'long' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {t.side}
                </span>
              </div>
              <div className="text-pearl/80 font-mono text-sm">{t.size}</div>
              <div className="text-pearl/80 font-mono text-sm">${fmtNum(t.entry)}</div>
              <div className="text-pearl font-mono text-sm">${fmtNum(active.price)}</div>
              <div className="text-right">
                <div className={`text-sm font-mono ${t.pnl >= 0 ? 'text-bull' : 'text-bear'}`}>
                  {t.pnl >= 0 ? '+' : ''}{fmtUSD(t.pnl)}
                </div>
                <div className="text-[10px] text-muted">{t.pnlPct >= 0 ? '+' : ''}{t.pnlPct.toFixed(2)}%</div>
              </div>
              <div className="text-right">
                <button className="px-3 py-1.5 text-[11px] font-medium rounded-lg bg-bear/10 hover:bg-bear/20 text-bear border border-bear/20 transition-colors">Close</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{k}</span>
      <span className="text-pearl font-mono">{v}</span>
    </div>
  );
}
