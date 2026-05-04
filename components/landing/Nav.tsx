'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV = [
  { name: 'Markets',   href: '/#markets'   },
  { name: 'Platform',  href: '/#platform'  },
  { name: 'Tiers',     href: '/#tiers'     },
  { name: 'Company',   href: '/#company'   },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-ink/85 backdrop-blur-2xl border-b border-pearl/[0.04]' : 'bg-transparent'
    }`}>
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 h-[68px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <div className="leading-none">
            <div className="font-serif text-lg text-pearl tracking-tight">Ferno <span className="italic text-amber-300">Limited</span></div>
            <div className="text-[9px] text-muted tracking-[0.25em] uppercase mt-0.5">Markets · Capital · Custody</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="text-sm text-pearl/75 hover:text-pearl transition-colors">{n.name}</Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login" className="text-sm text-pearl/75 hover:text-pearl transition-colors">Sign in</Link>
          <Link href="/login" className="group inline-flex items-center gap-1.5 px-4 py-2 bg-pearl hover:bg-amber-100 rounded-full text-ink text-sm font-medium transition-all">
            Open account <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <button className="lg:hidden p-2 text-pearl/80" onClick={() => setOpen(v => !v)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-pearl/5 bg-ink">
          <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-pearl/80 hover:bg-white/5 text-sm font-medium">{n.name}</Link>
            ))}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Link href="/login" onClick={() => setOpen(false)} className="text-center py-2.5 rounded-full bg-white/5 border border-pearl/10 text-pearl text-sm">Sign in</Link>
              <Link href="/login" onClick={() => setOpen(false)} className="text-center py-2.5 rounded-full bg-pearl text-ink text-sm font-medium">Open account</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Logo() {
  return (
    <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(243,203,71,0.25)]">
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    </div>
  );
}
