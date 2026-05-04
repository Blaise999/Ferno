'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { FOREX } from '@/data/forex';
import { BALANCE, TRADES } from '@/data/user';
import { fmtUSD, fmtNum } from '@/lib/format';
import TradeChart from '@/components/charts/TradeChart';

export default function FXTrade() {
  const [active, setActive] = useState(FOREX[0]);
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [size, setSize] = useState('10000');
  const [leverage, setLeverage] = useState(50);

  const openTrades = TRADES.filter(t => t.status === 'open' && t.pair.includes('/'));

  return (
    <div className="space-y-5 max-w-[1500px]">
      <div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-3">Spot · Foreign exchange</p>
        <h1 className="font-serif text-3xl text-pearl font-light tracking-tight">Currencies & metals</h1>
      </div>

      {/* Pair strip */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {FOREX.slice(0, 10).map(p => (
          <button key={p.pair} onClick={() => setActive(p)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all flex-shrink-0 ${
              active.pair === p.pair
                ? 'bg-pearl/[0.06] border-amber-300/30 text-pearl'
                : 'bg-pearl/[0.02] border-pearl/[0.06] text-muted hover:text-pearl'
            }`}>
            <div className="text-left">
              <div className="text-sm font-medium">{p.pair}</div>
              <div className={`text-[10px] font-mono ${p.change24h >= 0 ? 'text-bull' : 'text-bear'}`}>
                {p.change24h >= 0 ? '+' : ''}{p.change24h.toFixed(2)}%
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-6">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl text-pearl font-medium tracking-tight">{active.pair}</h2>
                <span className="text-xs text-muted capitalize">{active.category}</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-bear">Bid</span>
                  <span className="font-serif text-2xl text-bear font-light tracking-tight font-mono">{active.bid.toFixed(active.bid < 10 ? 5 : 3)}</span>
                </div>
                <span className="text-muted">/</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-bull">Ask</span>
                  <span className="font-serif text-2xl text-bull font-light tracking-tight font-mono">{active.ask.toFixed(active.ask < 10 ? 5 : 3)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 text-right">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted">Change</div>
                <div className={`text-sm font-mono mt-0.5 ${active.change24h >= 0 ? 'text-bull' : 'text-bear'}`}>
                  {active.change24h >= 0 ? '+' : ''}{active.change24h.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted">High</div>
                <div className="text-sm text-pearl font-mono mt-0.5">{active.high24h.toFixed(active.high24h < 10 ? 5 : 3)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted">Low</div>
                <div className="text-sm text-pearl font-mono mt-0.5">{active.low24h.toFixed(active.low24h < 10 ? 5 : 3)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted">Spread</div>
                <div className="text-sm text-pearl font-mono mt-0.5">{active.spread} pip</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
              {['1H', '4H', '1D', '1W', '1M'].map((t, i) => (
                <button key={t} className={`px-3 py-1 text-[11px] rounded ${i === 2 ? 'bg-pearl/10 text-pearl' : 'text-muted hover:text-pearl'}`}>{t}</button>
              ))}
            </div>
            <span className="text-[11px] text-muted flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-bull animate-pulse" /> Live</span>
          </div>

          <TradeChart data={active.spark} up={active.change24h >= 0} />
        </div>

        {/* Order ticket */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-6">
            <div className="grid grid-cols-2 gap-1 p-1 bg-pearl/[0.03] rounded-xl mb-5">
              <button onClick={() => setSide('buy')} className={`py-2.5 rounded-lg text-sm font-medium transition-all ${side === 'buy' ? 'bg-bull/15 text-bull border border-bull/30' : 'text-muted'}`}>
                <TrendingUp className="w-3.5 h-3.5 inline mr-1.5" /> Long
              </button>
              <button onClick={() => setSide('sell')} className={`py-2.5 rounded-lg text-sm font-medium transition-all ${side === 'sell' ? 'bg-bear/15 text-bear border border-bear/30' : 'text-muted'}`}>
                <TrendingDown className="w-3.5 h-3.5 inline mr-1.5" /> Short
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted">Size ({active.base})</label>
                <div className="mt-1.5 relative">
                  <input type="text" value={size} onChange={e => setSize(e.target.value)}
                    className="w-full px-4 py-3 pr-14 bg-pearl/[0.03] border border-pearl/[0.10] rounded-xl text-pearl text-sm font-mono focus:outline-none focus:border-amber-300/40 transition-colors" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-muted">{active.base}</span>
                </div>
              </div>

              <div>
                <label className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted">
                  <span>Leverage</span>
                  <span className="text-pearl font-mono">{leverage}x</span>
                </label>
                <input type="range" min={1} max={500} step={1} value={leverage} onChange={e => setLeverage(parseInt(e.target.value))}
                  className="w-full mt-2 accent-amber-300" />
                <div className="flex justify-between mt-1 text-[10px] text-muted/70 font-mono">
                  <span>1x</span><span>100x</span><span>200x</span><span>500x</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted">Stop loss</label>
                  <input type="text" placeholder="—" className="mt-1.5 w-full px-3 py-2.5 bg-pearl/[0.03] border border-pearl/[0.10] rounded-xl text-pearl text-sm font-mono focus:outline-none focus:border-amber-300/40 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted">Take profit</label>
                  <input type="text" placeholder="—" className="mt-1.5 w-full px-3 py-2.5 bg-pearl/[0.03] border border-pearl/[0.10] rounded-xl text-pearl text-sm font-mono focus:outline-none focus:border-amber-300/40 transition-colors" />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-pearl/[0.06] space-y-2 text-[12px]">
              <Row k="Entry price" v={(side === 'buy' ? active.ask : active.bid).toFixed(active.ask < 10 ? 5 : 3)} />
              <Row k="Margin used" v={fmtUSD(parseFloat(size || '0') / leverage)} />
              <Row k="Spread cost" v={`${active.spread} pip`} />
              <Row k="Available"   v={fmtUSD(BALANCE.available)} />
            </div>

            <button className={`w-full mt-5 py-3.5 rounded-xl text-sm font-semibold transition-all ${
              side === 'buy' ? 'bg-bull hover:bg-bull/90 text-white' : 'bg-bear hover:bg-bear/90 text-white'
            }`}>
              {side === 'buy' ? `Buy ${active.pair}` : `Sell ${active.pair}`}
            </button>
          </div>

          {/* Live stream */}
          <div className="rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 font-medium mb-3">Top FX movers</div>
            <div className="space-y-1">
              {FOREX.slice(0, 6).map(f => (
                <div key={f.pair} className="flex items-center justify-between py-1.5 border-b border-pearl/[0.04] last:border-0">
                  <span className="text-sm text-pearl">{f.pair}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-pearl font-mono">{f.bid.toFixed(f.bid < 10 ? 5 : 3)}</span>
                    <span className={`text-[11px] font-mono ${f.change24h >= 0 ? 'text-bull' : 'text-bear'}`}>
                      {f.change24h >= 0 ? '+' : ''}{f.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
