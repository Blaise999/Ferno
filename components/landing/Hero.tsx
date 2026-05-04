'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MoveRight, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink min-h-[92vh] flex items-end pb-20">
      {/* Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=2400&q=85"
          alt=""
          fill
          priority
          className="object-cover opacity-[0.20]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/85 to-ink" />
      </div>

      {/* Aurora */}
      <div className="absolute top-0 inset-x-0 h-[60vh] bg-aurora bg-[length:300%_300%] animate-aurora opacity-25 mix-blend-screen pointer-events-none" />

      {/* Glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-amber-500/[0.10] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-ferno/[0.08] blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8 w-full pt-24">
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-10">
          <span className="w-12 h-px bg-pearl/30" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-muted font-medium">Hong Kong · International · Est. 2019</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-y-16 lg:gap-x-10 items-end">
          {/* Headline */}
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
              className="font-serif font-light leading-[0.92] tracking-tight text-pearl"
              style={{ fontSize: 'clamp(3rem, 7.5vw, 6.75rem)' }}
            >
              Markets, custody,<br />
              and <em className="italic font-medium text-amber-300">capital</em><br />
              under one roof.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-9 text-base md:text-lg text-pearl/75 max-w-[520px] leading-[1.65]"
            >
              Trade crypto, foreign exchange and global equities through a single
              account. Execution measured in milliseconds. A desk that picks up
              the phone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-11 flex flex-col sm:flex-row gap-3"
            >
              <Link href="/login" className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-pearl hover:bg-amber-100 rounded-full text-ink font-medium transition-all hover:-translate-y-0.5">
                Open an account <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/markets" className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-pearl/15 hover:border-pearl/30 rounded-full text-pearl font-medium backdrop-blur-sm transition-all">
                See live markets <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-14 grid grid-cols-3 gap-8 max-w-[520px]"
            >
              {[
                { v: '$2.1B', l: 'Volume YTD' },
                { v: '210k',  l: 'Members' },
                { v: '< 50ms',l: 'Execution' },
              ].map(s => (
                <div key={s.l} className="border-l border-pearl/10 pl-4">
                  <div className="font-serif text-2xl text-pearl font-light">{s.v}</div>
                  <div className="text-[11px] text-muted uppercase tracking-wider mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              <div className="rounded-[20px] overflow-hidden border border-pearl/[0.07] bg-gradient-to-br from-charcoal/80 to-obsidian/95 backdrop-blur-2xl shadow-2xl shadow-black/50">
                <div className="px-5 py-3 flex items-center justify-between border-b border-pearl/[0.05]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-bear/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-bull/40" />
                  </div>
                  <div className="text-[10px] text-muted font-mono">Ferno · Console</div>
                  <div className="w-12" />
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-muted mb-1">Net assets</div>
                    <div className="font-serif font-light text-3xl text-pearl tracking-tight">
                      $284,632<span className="text-muted text-xl">.40</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                      <span className="text-bull font-mono">+$3,412.80</span>
                      <span className="text-bull/60">+1.21% today</span>
                    </div>
                  </div>

                  <div className="h-24 relative">
                    <svg viewBox="0 0 320 80" className="w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#f3cb47" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#f3cb47" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 65 L20 60 L40 62 L60 50 L80 54 L100 42 L120 46 L140 36 L160 38 L180 28 L200 32 L220 22 L240 26 L260 18 L280 22 L300 14 L320 18 L320 80 L0 80 Z" fill="url(#hg)" />
                      <path d="M0 65 L20 60 L40 62 L60 50 L80 54 L100 42 L120 46 L140 36 L160 38 L180 28 L200 32 L220 22 L240 26 L260 18 L280 22 L300 14 L320 18" stroke="#f3cb47" strokeWidth="1.5" fill="none" />
                    </svg>
                    <div className="absolute top-2 left-0 text-[10px] text-muted font-mono">BTC/USDT · 1d</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-pearl/[0.05]">
                    {[
                      { s: 'ETH',     p: '3,512',  c: '+1.84%' },
                      { s: 'EUR/USD', p: '1.0832', c: '+0.12%' },
                      { s: 'AAPL',    p: '189.45', c: '+1.13%' },
                    ].map(t => (
                      <div key={t.s}>
                        <div className="text-[9px] text-muted">{t.s}</div>
                        <div className="text-pearl font-mono text-xs font-medium mt-0.5">${t.p}</div>
                        <div className="text-[10px] text-bull/80 font-mono mt-0.5">{t.c}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating pill */}
              <motion.div
                initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9 }}
                className="absolute -left-3 sm:-left-6 -bottom-4 hidden sm:block animate-float"
              >
                <div className="flex items-center gap-3 px-4 py-3 bg-charcoal/95 backdrop-blur-xl rounded-2xl border border-amber-300/20 shadow-2xl">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-ink" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-muted">Live order</div>
                    <div className="text-sm text-pearl font-medium whitespace-nowrap">BTC long · +$193.20</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.1 }}
                className="absolute -right-2 -top-3 hidden sm:block"
              >
                <div className="px-3 py-1.5 rounded-full bg-pearl/[0.05] border border-pearl/15 backdrop-blur-md text-pearl text-[11px] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-bull animate-pulse" /> Markets open · HKT
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
