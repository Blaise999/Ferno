'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight, Zap, Shield, Globe, Layers, Lock, Headphones, Star, ArrowRight } from 'lucide-react';
import { CRYPTO } from '@/data/crypto';
import { FOREX } from '@/data/forex';
import { fmtNum, fmtCompact } from '@/lib/format';
import Sparkline from '@/components/charts/Sparkline';

// ─── PRESS ───────────────────────────────────────────────
const PRESS = ['Bloomberg', 'Financial Times', 'Reuters', 'Forbes', 'CoinDesk', 'TechCrunch'];

export function Press() {
  return (
    <section className="relative bg-ink border-y border-pearl/[0.04]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-12">
        <p className="text-center text-[10px] uppercase tracking-[0.4em] text-muted/70 font-medium mb-7">Featured in</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5 lg:gap-x-20">
          {PRESS.map(p => (
            <span key={p} className="font-serif text-pearl/35 hover:text-pearl/70 transition-colors text-xl lg:text-2xl tracking-tight font-light">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STATS ───────────────────────────────────────────────
const STATS = [
  { v: '$2.1B+', l: 'Volume traded',       sub: 'Last 12 months' },
  { v: '210k+',  l: 'Active members',      sub: 'Across 80+ countries' },
  { v: '< 50ms', l: 'Average execution',   sub: 'Co-located engine' },
  { v: '99.99%', l: 'Platform uptime',     sub: 'Past 365 days' },
];

export function Stats() {
  return (
    <section className="relative py-24 bg-ink overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-400/[0.06] blur-[160px] rounded-full pointer-events-none" />
      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="grid md:grid-cols-4 gap-px bg-pearl/[0.06] rounded-2xl overflow-hidden border border-pearl/[0.06]">
          {STATS.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-ink p-8 lg:p-10">
              <div className="font-serif text-4xl lg:text-5xl font-light text-pearl tracking-tight">{s.v}</div>
              <div className="mt-4 text-sm text-pearl/85">{s.l}</div>
              <div className="text-[11px] text-muted mt-1">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MARKETS ──────────────────────────────────────────────
export function Markets() {
  const [tab, setTab] = useState<'crypto' | 'forex'>('crypto');
  return (
    <section id="markets" className="relative py-28 bg-ink overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-x-10 mb-12">
          <div className="lg:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-5">Markets</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-pearl leading-[1.05]">
              Crypto, foreign exchange,<br /><em className="italic font-medium text-amber-300">global</em> equities.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3 flex items-end">
            <p className="text-pearl/70 leading-relaxed text-base lg:text-lg max-w-md">
              Bitcoin alongside the Yen. Apple alongside Solana. One account, three asset classes, deep order books.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1 border-b border-pearl/[0.07] mb-8">
          {[
            { id: 'crypto', label: 'Digital assets', count: '350+ pairs' },
            { id: 'forex',  label: 'Foreign exchange', count: '60+ pairs' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              className={`relative px-5 py-3 text-sm font-medium transition-colors ${tab === t.id ? 'text-pearl' : 'text-muted hover:text-pearl/80'}`}>
              <span className="relative z-10">{t.label}</span>
              <span className={`relative z-10 ml-2 text-[10px] tracking-wide ${tab === t.id ? 'text-muted' : 'text-muted/50'}`}>{t.count}</span>
              {tab === t.id && <span className="absolute -bottom-px left-0 right-0 h-px bg-amber-300" />}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="border border-pearl/[0.06] rounded-2xl overflow-hidden bg-charcoal/30 backdrop-blur-sm">
          {tab === 'crypto' ? (
            CRYPTO.slice(0, 8).map((r, i) => (
              <Link key={r.symbol} href="/markets" className={`grid grid-cols-12 px-6 py-4 hover:bg-pearl/[0.02] transition-colors group ${i !== 7 ? 'border-b border-pearl/[0.04]' : ''}`}>
                <div className="col-span-5 sm:col-span-4 flex items-center gap-3 min-w-0">
                  <div className="relative w-9 h-9 rounded-full bg-pearl/[0.04] border border-pearl/[0.06] overflow-hidden flex-shrink-0">
                    <Image src={r.logo} alt={r.symbol} fill className="object-contain p-1.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-pearl truncate">{r.symbol}</div>
                    <div className="text-xs text-muted truncate">{r.name}</div>
                  </div>
                </div>
                <div className="col-span-3 text-right font-mono text-pearl self-center text-sm">${fmtNum(r.price)}</div>
                <div className={`col-span-2 text-right font-mono self-center text-sm ${r.change24h >= 0 ? 'text-bull' : 'text-bear'}`}>{r.change24h >= 0 ? '+' : ''}{r.change24h.toFixed(2)}%</div>
                <div className="hidden sm:flex sm:col-span-2 justify-end items-center"><Sparkline data={r.spark} up={r.change24h >= 0} width={70} height={20} /></div>
                <div className="col-span-2 sm:col-span-1 text-right self-center">
                  <ArrowUpRight className="w-4 h-4 text-muted/60 group-hover:text-amber-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all inline" />
                </div>
              </Link>
            ))
          ) : (
            FOREX.slice(0, 8).map((r, i) => (
              <Link key={r.pair} href="/markets" className={`grid grid-cols-12 px-6 py-4 hover:bg-pearl/[0.02] transition-colors group ${i !== 7 ? 'border-b border-pearl/[0.04]' : ''}`}>
                <div className="col-span-5 sm:col-span-4 flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300/30 to-amber-600/30 border border-pearl/[0.06] flex items-center justify-center text-[10px] font-mono text-pearl flex-shrink-0">{r.base}</div>
                  <div className="min-w-0">
                    <div className="font-medium text-pearl truncate">{r.pair}</div>
                    <div className="text-xs text-muted truncate capitalize">{r.category}</div>
                  </div>
                </div>
                <div className="col-span-3 text-right font-mono text-pearl self-center text-sm">{r.bid.toFixed(r.bid < 10 ? 5 : 3)}</div>
                <div className={`col-span-2 text-right font-mono self-center text-sm ${r.change24h >= 0 ? 'text-bull' : 'text-bear'}`}>{r.change24h >= 0 ? '+' : ''}{r.change24h.toFixed(2)}%</div>
                <div className="hidden sm:flex sm:col-span-2 justify-end items-center"><Sparkline data={r.spark} up={r.change24h >= 0} width={70} height={20} /></div>
                <div className="col-span-2 sm:col-span-1 text-right self-center">
                  <ArrowUpRight className="w-4 h-4 text-muted/60 group-hover:text-amber-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all inline" />
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/markets" className="inline-flex items-center gap-1.5 text-[13px] text-amber-300 hover:text-amber-200 font-medium">View all markets <ArrowRight className="w-3 h-3" /></Link>
        </div>
      </div>
    </section>
  );
}

// ─── PILLARS ──────────────────────────────────────────────
const PILLARS = [
  { n: '01', title: 'A trading floor without the floor.', desc: 'Crypto, FX and equities under one custody account, on one screen, with one set of fees.', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80' },
  { n: '02', title: 'Concierge desk, not a chatbot.',     desc: 'When something needs human attention, a real person picks up. Average reply: under 90 seconds.', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80' },
  { n: '03', title: 'Your keys. Your custody.',          desc: 'Connect any self-custody wallet. Withdraw any asset, on any chain, any time. We just clear the trades.', img: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&w=1400&q=80' },
];

const SMALL = [
  { i: Zap,        t: 'Sub-50ms execution',      d: 'Co-located matching in HK, NY, LDN.' },
  { i: Shield,     t: 'Cold-storage primary',    d: '95% of client funds held offline.' },
  { i: Lock,       t: 'Segregated treasury',     d: 'HSBC and Standard Chartered, not commingled.' },
  { i: Globe,      t: 'API-first',               d: 'REST and WebSocket endpoints for algo accounts.' },
  { i: Layers,     t: 'Quarterly proof of reserves', d: 'Public attestation by an independent auditor.' },
  { i: Headphones, t: 'Time-zone-agnostic desk', d: 'Operations staffed across nine zones.' },
];

export function Platform() {
  return (
    <section id="platform" className="relative py-32 bg-ink overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-x-10 mb-20">
          <div className="lg:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-5">The platform</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-pearl leading-[1.05]">
              Built for serious <em className="italic font-medium text-amber-300">capital.</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3 flex items-end">
            <p className="text-pearl/70 leading-relaxed text-base lg:text-lg">
              No fluff. No fine print. Markets that work, tools that respond, a desk that answers.
            </p>
          </div>
        </div>

        <div className="space-y-32">
          {PILLARS.map((p, i) => (
            <motion.div key={p.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className={`grid lg:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden border border-pearl/[0.07] group">
                  <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-ink/50 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 font-mono text-xs text-amber-300/80 tracking-wider">{p.n}</div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <h3 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-pearl leading-[1.1]">{p.title}</h3>
                <p className="mt-5 text-pearl/70 leading-relaxed text-[15px]">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 pt-14 border-t border-pearl/[0.07]">
          <div className="grid lg:grid-cols-12 gap-10 mb-10">
            <div className="lg:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-4">Engineering</p>
              <h3 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-pearl">Boring infrastructure.<br /><em className="italic font-medium text-amber-300">Exciting</em> trades.</h3>
            </div>
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7">
                {SMALL.map(s => (
                  <div key={s.t} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                      <s.i className="w-4 h-4 text-amber-300" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="font-medium text-pearl mb-1">{s.t}</div>
                      <div className="text-sm text-muted leading-relaxed">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TIERS ───────────────────────────────────────────────
const TIERS = [
  { name: 'Starter',    price: '50',    bonus: '+ $10 credit',    desc: 'Begin trading with the essentials.', features: ['Spot crypto + FX', 'Daily limit · $2,000', 'Email support', 'Mobile + web apps'] },
  { name: 'Pro',        price: '300',   bonus: '+ $60 credit',    desc: 'For active hands and bigger lines.', popular: true, features: ['Everything in Starter', 'Equities (US + HK)', 'Daily limit · $10,000', 'Priority support', 'Live chat'] },
  { name: 'Elite',      price: '1,500', bonus: '+ $400 credit',   desc: 'For traders who run capital seriously.', features: ['Everything in Pro', 'Daily limit · $50,000', 'Custom FX rates', 'API access', 'Fast-track verification'] },
  { name: 'Sovereign',  price: '5,000', bonus: '+ $1,500 credit', desc: 'Concierge tier with personal account manager.', features: ['Everything in Elite', 'Daily limit · $250,000', 'Dedicated manager', 'OTC desk access', 'Bespoke FX corridors'] },
];

export function Tiers() {
  return (
    <section id="tiers" className="relative py-32 bg-ink overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-x-10 mb-20">
          <div className="lg:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-5">Tiers</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-pearl leading-[1.05]">
              Pay once. <em className="italic font-medium text-amber-300">Keep</em> the perks.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3 flex items-end">
            <p className="text-pearl/70 leading-relaxed text-base lg:text-lg">
              Tiers are one-time purchases. No subscriptions, no expiry. Get a sign-up credit instantly.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-pearl/[0.06] rounded-2xl overflow-hidden border border-pearl/[0.06]">
          {TIERS.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className={`relative p-8 ${t.popular ? 'bg-gradient-to-b from-charcoal/60 to-ink' : 'bg-ink hover:bg-charcoal/30'} transition-colors`}>
              {t.popular && <div className="absolute top-5 right-5 text-[9px] uppercase tracking-[0.2em] text-amber-300 font-medium">Recommended</div>}
              <div className="font-serif text-2xl text-pearl font-medium">{t.name}</div>
              <p className="mt-2 text-sm text-muted min-h-[42px]">{t.desc}</p>
              <div className="mt-7 mb-1 flex items-baseline gap-1.5">
                <span className="text-muted text-base">$</span>
                <span className="font-serif font-light text-5xl text-pearl tracking-tight">{t.price}</span>
                <span className="text-muted text-xs">once</span>
              </div>
              <div className="text-[11px] text-amber-300/85 font-medium mb-8">{t.bonus}</div>
              <ul className="space-y-2.5 mb-9 min-h-[180px]">
                {t.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-pearl/85">
                    <span className="w-1 h-1 rounded-full bg-amber-300 flex-shrink-0 mt-2" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/login" className={`block text-center py-3 rounded-full font-medium text-sm transition-all ${t.popular ? 'bg-pearl hover:bg-amber-100 text-ink' : 'border border-pearl/15 hover:border-pearl/30 text-pearl hover:bg-white/5'}`}>
                Choose {t.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────
const TESTIMONIALS = [
  { q: 'Ferno replaced three brokers I used to juggle. Execution is fast and the desk picks up the phone.', n: 'Wei-Lin Chang', r: 'Hedge Fund Trader · Singapore' },
  { q: 'I run my entire personal book here now. Crypto, FX, equities — one screen, one wallet, one portfolio view.', n: 'Marcus Calloway', r: 'Swing Trader · London' },
  { q: 'The Sovereign tier was worth every cent. My account manager picks up in two rings.', n: 'Diego Reyes', r: 'Portfolio Manager · São Paulo' },
  { q: 'Mobile experience is genuinely better than the incumbents. I trade NVDA, EUR/USD and ETH on a single screen.', n: 'Aria Khoo', r: 'Retail Trader · Manila' },
  { q: 'Withdrawals come through within an hour. Every time. That alone is worth the upgrade.', n: 'Rachel Tang', r: 'Crypto Trader · Sydney' },
  { q: 'Spreads are razor-thin on majors. I moved my entire FX book here last quarter.', n: 'Elena Vasquez', r: 'FX Specialist · Madrid' },
];

export function Testimonials() {
  return (
    <section className="relative py-32 bg-ink overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-x-10 mb-20">
          <div className="lg:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-5">Members</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-pearl leading-[1.05]">
              The <em className="italic font-medium text-amber-300">people</em><br />we hold capital for.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3 flex items-end">
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />)}
              </div>
              <span className="text-pearl/70 text-sm">4.9 / 5 from 12,400 reviews</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-pearl/[0.06] rounded-2xl overflow-hidden border border-pearl/[0.06]">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="bg-ink p-8 lg:p-9">
              <p className="font-serif font-light text-pearl text-lg leading-[1.4] tracking-tight">&ldquo;{t.q}&rdquo;</p>
              <div className="mt-7 pt-6 border-t border-pearl/[0.06]">
                <div className="text-pearl text-sm font-medium">{t.n}</div>
                <div className="text-muted text-xs mt-0.5">{t.r}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPANY ──────────────────────────────────────────────
export function Company() {
  return (
    <section id="company" className="relative py-32 bg-ink overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.15]">
        <Image src="https://images.unsplash.com/photo-1535139262971-c51845709a48?auto=format&fit=crop&w=2400&q=85" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-x-10 items-center">
          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-amber-300/80 font-medium">Hong Kong · 香港</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-pearl leading-[1.05]">
              Built in Asia&apos;s<br /><em className="italic font-medium text-amber-300">financial</em> capital.
            </h2>
            <div className="mt-9 max-w-xl space-y-5 text-pearl/75 leading-relaxed text-base">
              <p>Ferno Limited is licensed and registered in Hong Kong — the world&apos;s third-largest financial center. We hold SFC Type 1, 4 and 9 licenses and undergo SOC 2 audits annually.</p>
              <p>Our operations desk runs twenty-four hours a day across nine time zones, with verified institutional rails in eighty-plus countries.</p>
            </div>

            <div className="mt-9 flex flex-wrap gap-2.5">
              {['SFC Type 1', 'SFC Type 4', 'SFC Type 9', 'ISO 27001', 'SOC 2 Type II'].map(b => (
                <span key={b} className="text-[10px] uppercase tracking-wider text-pearl/55 px-3 py-1.5 rounded-full border border-pearl/10">{b}</span>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-6 relative mt-12 lg:mt-0">
            <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden border border-pearl/[0.07]">
              <Image src="https://images.unsplash.com/photo-1559564484-0d39c5b69b1c?auto=format&fit=crop&w=1400&q=85" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 right-7">
                <div className="font-mono text-[10px] text-amber-300/80 tracking-wider mb-3">Headquarters</div>
                <div className="font-serif font-medium text-pearl text-2xl tracking-tight">Two IFC, 8 Finance Street</div>
                <div className="text-muted text-sm mt-1">Central, Hong Kong SAR · 香港特別行政區</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────
export function CTA() {
  return (
    <section className="relative py-32 bg-ink overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[60vh] bg-aurora bg-[length:300%_300%] animate-aurora opacity-20 mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1100px] mx-auto px-6 sm:px-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-7">Open an account</p>
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-pearl leading-[0.95]">
          Capital, <em className="italic font-medium text-amber-300">unbordered.</em>
        </h2>
        <p className="mt-7 text-lg text-pearl/75 max-w-xl mx-auto leading-relaxed">
          Sixty seconds to open. A lifetime of access.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-pearl hover:bg-amber-100 rounded-full text-ink font-medium transition-all hover:-translate-y-0.5">
            Open an account <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link href="/markets" className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-pearl/15 hover:border-pearl/30 rounded-full text-pearl font-medium backdrop-blur-sm transition-all">
            View markets
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────
export function Footer() {
  const cols = [
    { t: 'Markets',  links: ['Crypto', 'Foreign exchange', 'Equities', 'Tier programs'] },
    { t: 'Platform', links: ['Console', 'Wallet', 'Self-custody', 'API access'] },
    { t: 'Company',  links: ['About', 'Careers', 'Press kit', 'Contact'] },
    { t: 'Legal',    links: ['Terms of service', 'Privacy notice', 'AML policy', 'Risk disclosure'] },
  ];
  return (
    <footer className="bg-ink border-t border-pearl/[0.04]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
                </svg>
              </div>
              <div>
                <div className="font-serif text-lg text-pearl tracking-tight">Ferno <span className="italic text-amber-300">Limited</span></div>
                <div className="text-[9px] text-muted tracking-[0.25em] uppercase mt-0.5">Markets · Capital · Custody</div>
              </div>
            </Link>
            <p className="mt-6 text-[14px] text-muted max-w-sm leading-relaxed">A multi-asset trading platform built in Hong Kong for traders who take their capital seriously.</p>
            <div className="mt-7">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted/70 mb-2">Address</div>
              <div className="text-pearl/70 text-sm leading-relaxed">Two IFC, 8 Finance Street<br />Central, Hong Kong SAR</div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map(c => (
              <div key={c.t}>
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted/70 mb-4 font-medium">{c.t}</h4>
                <ul className="space-y-3">
                  {c.links.map(l => <li key={l}><span className="text-sm text-pearl/65 hover:text-pearl transition-colors cursor-pointer">{l}</span></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-pearl/[0.05] flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-muted/70">
          <p>© {new Date().getFullYear()} Ferno Limited. All rights reserved.</p>
          <p>Trading involves risk. Past performance does not indicate future results.</p>
        </div>
      </div>
    </footer>
  );
}
