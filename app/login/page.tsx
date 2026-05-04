'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push('/dashboard'), 600);
  };

  return (
    <div className="min-h-screen bg-ink flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1576487236230-eaa4afe68192?auto=format&fit=crop&w=1800&q=85" alt="" fill priority className="object-cover opacity-[0.20]" />
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/70 to-ink" />
        </div>
        <div className="absolute top-0 inset-x-0 h-full bg-aurora bg-[length:300%_300%] animate-aurora opacity-15 mix-blend-screen pointer-events-none" />

        <motion.div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-amber-400/15 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
              </svg>
            </div>
            <div className="leading-none">
              <div className="font-serif font-medium text-pearl text-lg tracking-tight">Ferno <span className="italic text-amber-300">Limited</span></div>
              <div className="text-[9px] text-muted tracking-[0.25em] uppercase mt-0.5">Hong Kong · Est. 2019</div>
            </div>
          </Link>

          <div className="space-y-10 max-w-lg">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 font-medium mb-6">Welcome back</p>
              <h1 className="font-serif font-light text-5xl xl:text-6xl text-pearl leading-[0.98] tracking-tight">
                Markets, custody,<br />and <em className="italic font-medium text-amber-300">capital</em><br />under one roof.
              </h1>
            </motion.div>
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-pearl/10">
              {[{ v: '$2.1B', l: 'Volume YTD' }, { v: '210k+', l: 'Members' }, { v: '80+', l: 'Markets' }].map(s => (
                <div key={s.l}>
                  <div className="font-serif text-2xl xl:text-3xl text-pearl font-light tracking-tight">{s.v}</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-muted/70">© {new Date().getFullYear()} Ferno Limited · SFC Type 1, 4, 9 licensed.</div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col bg-ink">
        <div className="lg:hidden p-6 flex items-center justify-between border-b border-pearl/[0.05]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
              </svg>
            </div>
            <div className="font-serif font-medium text-pearl text-base">Ferno Limited</div>
          </Link>
          <Link href="/" className="text-xs text-muted hover:text-pearl">← Home</Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-3">Sign in</p>
              <h2 className="font-serif text-4xl text-pearl font-light tracking-tight">Welcome back.</h2>
              <p className="mt-3 text-pearl/60 text-sm">Sign in to your trading account.</p>
            </motion.div>

            <form onSubmit={submit} className="mt-9 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted font-medium">Email</label>
                <div className="mt-2 relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
                  <input
                    type="email"
                    defaultValue="alex.morgan@ferno-demo.io"
                    className="w-full pl-10 pr-4 py-3 bg-pearl/[0.03] border border-pearl/[0.10] focus:border-amber-300/40 rounded-xl text-pearl placeholder:text-muted/50 text-sm focus:outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted font-medium">Password</label>
                  <a className="text-[11px] text-muted hover:text-amber-300 transition-colors cursor-pointer">Forgot?</a>
                </div>
                <div className="mt-2 relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
                  <input
                    type="password"
                    defaultValue="demo1234"
                    className="w-full pl-10 pr-4 py-3 bg-pearl/[0.03] border border-pearl/[0.10] focus:border-amber-300/40 rounded-xl text-pearl placeholder:text-muted/50 text-sm focus:outline-none transition-colors"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-pearl hover:bg-amber-100 disabled:opacity-50 rounded-xl text-ink font-medium text-sm transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  <>Sign in <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm text-muted">Don&apos;t have an account? </span>
              <Link href="/dashboard" className="text-sm text-amber-300 hover:text-amber-200 font-medium">Open one →</Link>
            </div>

            <div className="mt-10 p-4 bg-amber-400/[0.05] border border-amber-400/15 rounded-xl">
              <div className="text-[10px] uppercase tracking-[0.2em] text-amber-300/80 font-medium mb-1.5">Demo mode</div>
              <p className="text-xs text-pearl/70 leading-relaxed">This is a sample for demonstration. Click <span className="text-pearl font-medium">Sign in</span> with the prefilled credentials to enter the dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
