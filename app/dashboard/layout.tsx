'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Bitcoin, DollarSign, BarChart3, History, Settings,
  Search, Bell, LogOut, Menu, X, ChevronDown, Wallet, CreditCard, TrendingUp,
} from 'lucide-react';
import { USER, BALANCE, NOTIFICATIONS } from '@/data/user';
import { fmtUSD } from '@/lib/format';

const NAV = [
  { name: 'Overview',  href: '/dashboard',         icon: LayoutDashboard },
  { name: 'Crypto',    href: '/dashboard/trade/crypto', icon: Bitcoin },
  { name: 'Forex',     href: '/dashboard/trade/fx',     icon: DollarSign },
  { name: 'Markets',   href: '/markets',           icon: TrendingUp },
  { name: 'Portfolio', href: '/portfolio',         icon: BarChart3 },
  { name: 'History',   href: '/history',           icon: History },
];

export default function DashLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const isActive = (h: string) => path === h || (h !== '/dashboard' && path?.startsWith(h));

  return (
    <div className="min-h-screen bg-ink text-pearl flex">
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 bg-obsidian/80 backdrop-blur-xl border-r border-pearl/[0.05] transition-all duration-300 ${open ? 'w-60' : 'w-[76px]'}`}>
        <div className="h-[68px] flex items-center px-5 border-b border-pearl/[0.05]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
              </svg>
            </div>
            {open && (
              <div className="leading-none">
                <div className="font-serif font-medium text-pearl text-base">Ferno <span className="italic text-amber-300">Limited</span></div>
                <div className="text-[9px] text-muted tracking-[0.25em] uppercase mt-0.5">Console</div>
              </div>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-0.5">
          {NAV.map(n => (
            <Link
              key={n.href} href={n.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive(n.href) ? 'bg-pearl/[0.04] text-pearl' : 'text-muted hover:text-pearl hover:bg-pearl/[0.02]'}`}
            >
              <n.icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.75} />
              {open && <span className="text-[13.5px] font-medium">{n.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="border-t border-pearl/[0.05] py-3 px-3 space-y-0.5">
          <Link href="/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${isActive('/settings') ? 'bg-pearl/[0.04] text-pearl' : 'text-muted hover:text-pearl hover:bg-pearl/[0.02]'}`}>
            <Settings className="w-[18px] h-[18px]" strokeWidth={1.75} />
            {open && <span className="text-[13.5px] font-medium">Settings</span>}
          </Link>
          <button onClick={() => setOpen(v => !v)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted hover:text-pearl hover:bg-pearl/[0.02]">
            <ChevronDown className={`w-[18px] h-[18px] transition-transform ${open ? 'rotate-90' : '-rotate-90'}`} strokeWidth={1.75} />
            {open && <span className="text-[13.5px] font-medium">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobile(false)} className="lg:hidden fixed inset-0 bg-ink/80 backdrop-blur-sm z-40" />
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 bg-obsidian border-r border-pearl/[0.05] z-50 flex flex-col">
              <div className="h-[68px] flex items-center justify-between px-5 border-b border-pearl/[0.05]">
                <div className="font-serif font-medium text-pearl">Ferno <span className="italic text-amber-300">Limited</span></div>
                <button onClick={() => setMobile(false)} className="p-2 text-muted"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-0.5">
                {NAV.map(n => (
                  <Link key={n.href} href={n.href} onClick={() => setMobile(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${isActive(n.href) ? 'bg-pearl/[0.04] text-pearl' : 'text-muted hover:text-pearl hover:bg-pearl/[0.02]'}`}>
                    <n.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                    <span className="text-sm font-medium">{n.name}</span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${open ? 'lg:ml-60' : 'lg:ml-[76px]'}`}>
        <header className="h-[68px] bg-ink/70 backdrop-blur-2xl border-b border-pearl/[0.05] flex items-center justify-between px-5 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobile(true)} className="lg:hidden p-2 text-muted"><Menu className="w-5 h-5" /></button>
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-pearl/[0.03] rounded-full border border-pearl/[0.06]">
              <Search className="w-3.5 h-3.5 text-muted" />
              <input className="bg-transparent text-[13px] text-pearl placeholder:text-muted/60 focus:outline-none w-44 lg:w-60" placeholder="Search assets, traders…" />
              <kbd className="hidden lg:inline text-[10px] text-muted px-1.5 py-0.5 bg-pearl/[0.04] rounded font-mono">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-pearl/[0.03] rounded-full border border-pearl/[0.06]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Available</span>
              <span className="text-[13px] font-mono text-pearl">{fmtUSD(BALANCE.available)}</span>
            </div>

            <Link href="/dashboard" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-pearl hover:bg-amber-100 text-ink text-[13px] font-medium rounded-full transition-all">
              <CreditCard className="w-3.5 h-3.5" />
              Deposit
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotif(v => !v)} className="relative p-2 rounded-full hover:bg-pearl/[0.04] transition-colors">
                <Bell className="w-5 h-5 text-muted" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-300" />
              </button>
              {showNotif && (
                <div className="absolute right-0 mt-2 w-80 bg-charcoal border border-pearl/[0.08] rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-pearl/[0.05] flex items-center justify-between">
                    <div className="text-sm font-medium text-pearl">Notifications</div>
                    <span className="text-[10px] text-muted">{NOTIFICATIONS.filter(n => !n.read).length} new</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {NOTIFICATIONS.map(n => (
                      <div key={n.id} className={`px-4 py-3 border-b border-pearl/[0.04] hover:bg-pearl/[0.02] ${!n.read ? 'bg-amber-400/[0.03]' : ''}`}>
                        <div className="flex items-start gap-2">
                          {!n.read && <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-amber-300 flex-shrink-0" />}
                          <div className="flex-1">
                            <div className="text-sm text-pearl font-medium">{n.title}</div>
                            <div className="text-xs text-muted mt-0.5">{n.body}</div>
                            <div className="text-[10px] text-muted/70 mt-1">{n.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button onClick={() => setShowUser(v => !v)} className="flex items-center gap-2 p-1 rounded-full hover:bg-pearl/[0.04]">
                <div className="w-9 h-9 bg-gradient-to-br from-amber-300 to-amber-600 rounded-full flex items-center justify-center text-ink text-[13px] font-semibold">
                  {USER.firstName[0]}{USER.lastName[0]}
                </div>
              </button>
              {showUser && (
                <div className="absolute right-0 mt-2 w-64 bg-charcoal border border-pearl/[0.08] rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="p-4 border-b border-pearl/[0.05]">
                    <p className="text-sm font-medium text-pearl">{USER.firstName} {USER.lastName}</p>
                    <p className="text-xs text-muted mt-0.5">{USER.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-[10px] font-medium text-amber-300">
                      {USER.tier} tier
                    </div>
                  </div>
                  <div className="py-1.5">
                    <Link href="/settings" onClick={() => setShowUser(false)} className="flex items-center gap-3 px-4 py-2 text-[13px] text-pearl/80 hover:bg-pearl/[0.03]">
                      <Settings className="w-3.5 h-3.5" /> Settings
                    </Link>
                    <Link href="/portfolio" onClick={() => setShowUser(false)} className="flex items-center gap-3 px-4 py-2 text-[13px] text-pearl/80 hover:bg-pearl/[0.03]">
                      <Wallet className="w-3.5 h-3.5" /> Portfolio
                    </Link>
                  </div>
                  <div className="border-t border-pearl/[0.05] py-1.5">
                    <button onClick={() => router.push('/')} className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-bear/90 hover:bg-bear/[0.08]">
                      <LogOut className="w-3.5 h-3.5" /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8">{children}</main>
      </div>
    </div>
  );
}
