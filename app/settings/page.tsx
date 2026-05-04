'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, User as UserIcon, Bell, Shield, CreditCard, Globe, Check } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import { USER } from '@/data/user';

const SECTIONS = [
  { id: 'profile',       label: 'Profile',       icon: UserIcon },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security',      label: 'Security',      icon: Shield },
  { id: 'payments',      label: 'Payment methods', icon: CreditCard },
  { id: 'preferences',   label: 'Preferences',   icon: Globe },
];

export default function SettingsPage() {
  const [active, setActive] = useState('profile');

  return (
    <main className="min-h-screen bg-ink text-pearl">
      <Nav />

      <section className="max-w-[1280px] mx-auto px-6 sm:px-8 pt-16 pb-12">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-[12px] text-muted hover:text-pearl mb-6">
          <ArrowLeft className="w-3 h-3" /> Back to console
        </Link>
        <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/70 mb-5">Settings</p>
        <h1 className="font-serif text-5xl text-pearl font-light tracking-tight">Account.</h1>
        <p className="mt-3 text-pearl/65">Manage your profile, security, and preferences.</p>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 sm:px-8 pb-24">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <nav className="space-y-1 lg:sticky lg:top-24">
              {SECTIONS.map(s => (
                <button key={s.id} onClick={() => setActive(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all ${active === s.id ? 'bg-pearl/[0.05] text-pearl border border-pearl/[0.08]' : 'text-muted hover:text-pearl hover:bg-pearl/[0.02] border border-transparent'}`}>
                  <s.icon className="w-4 h-4" strokeWidth={1.75} />
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9 space-y-6">
            {active === 'profile' && (
              <Section title="Profile" desc="Personal information on your trading account.">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First name"   defaultValue={USER.firstName} />
                  <Field label="Last name"    defaultValue={USER.lastName} />
                  <Field label="Email"        defaultValue={USER.email} />
                  <Field label="Country"      defaultValue={USER.country} />
                  <Field label="Phone"        defaultValue="+852 9123 4567" />
                  <Field label="Tier"         defaultValue={USER.tier} disabled />
                </div>
                <Save />
              </Section>
            )}

            {active === 'notifications' && (
              <Section title="Notifications" desc="Choose what we tell you about, and how.">
                <div className="space-y-3">
                  {[
                    { l: 'Trade fills',           d: 'When orders execute',                    e: true,  c: 'Email · Push' },
                    { l: 'Price alerts',          d: 'Custom alerts on watched assets',        e: true,  c: 'Push' },
                    { l: 'Deposits / withdrawals',d: 'Balance movements',                      e: true,  c: 'Email · SMS' },
                    { l: 'Market news',           d: 'Daily digest from the desk',             e: false, c: 'Email' },
                    { l: 'Weekly performance',    d: 'Summary of your portfolio every Monday', e: true,  c: 'Email' },
                    { l: 'Promotional',           d: 'Tier offers and platform updates',       e: false, c: 'Email' },
                  ].map(n => <Toggle key={n.l} label={n.l} desc={n.d} channel={n.c} initial={n.e} />)}
                </div>
              </Section>
            )}

            {active === 'security' && (
              <Section title="Security" desc="Two-factor authentication, sessions, and login history.">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-pearl/[0.02] border border-pearl/[0.06] rounded-xl">
                    <div>
                      <div className="text-sm text-pearl font-medium">Two-factor authentication</div>
                      <div className="text-xs text-muted mt-1">Authenticator app enabled · Last verified 2 hours ago</div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-bull bg-bull/10 border border-bull/20 px-2.5 py-1 rounded-full"><Check className="w-3 h-3" /> Active</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-pearl/[0.02] border border-pearl/[0.06] rounded-xl">
                    <div>
                      <div className="text-sm text-pearl font-medium">Login history</div>
                      <div className="text-xs text-muted mt-1">Hong Kong · Now · Last login 4 hours ago from London</div>
                    </div>
                    <button className="text-[12px] text-amber-300 hover:text-amber-200">View all</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-pearl/[0.02] border border-pearl/[0.06] rounded-xl">
                    <div>
                      <div className="text-sm text-pearl font-medium">Withdrawal whitelist</div>
                      <div className="text-xs text-muted mt-1">3 addresses approved</div>
                    </div>
                    <button className="text-[12px] text-amber-300 hover:text-amber-200">Manage</button>
                  </div>
                  <button className="w-full mt-3 px-4 py-3 bg-bear/10 hover:bg-bear/20 text-bear border border-bear/20 rounded-xl text-sm font-medium transition-colors">
                    Sign out of all sessions
                  </button>
                </div>
              </Section>
            )}

            {active === 'payments' && (
              <Section title="Payment methods" desc="Wallets and bank accounts on file.">
                <div className="space-y-3">
                  {[
                    { l: 'USDT (TRC-20)', sub: 'TN3W4H6...joxb3m9', d: 'Default' },
                    { l: 'BTC',           sub: 'bc1qxy2k...x0wlh',  d: '' },
                    { l: 'HSBC HK',       sub: '••• 4421 · HKD',    d: 'Wire' },
                  ].map(m => (
                    <div key={m.l} className="flex items-center justify-between p-4 bg-pearl/[0.02] border border-pearl/[0.06] rounded-xl">
                      <div>
                        <div className="text-sm text-pearl font-medium flex items-center gap-2">
                          {m.l}
                          {m.d && <span className="text-[10px] uppercase tracking-wider text-amber-300 bg-amber-300/10 border border-amber-300/20 px-2 py-0.5 rounded-full">{m.d}</span>}
                        </div>
                        <div className="text-xs text-muted mt-1 font-mono">{m.sub}</div>
                      </div>
                      <button className="text-[12px] text-muted hover:text-bear">Remove</button>
                    </div>
                  ))}
                  <button className="w-full mt-3 px-4 py-3 border border-dashed border-pearl/15 hover:border-amber-300/30 hover:text-amber-300 text-muted rounded-xl text-sm font-medium transition-colors">
                    + Add payment method
                  </button>
                </div>
              </Section>
            )}

            {active === 'preferences' && (
              <Section title="Preferences" desc="Display, language, and trading defaults.">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Display currency" defaultValue="USD" />
                  <Field label="Language"         defaultValue="English" />
                  <Field label="Time zone"        defaultValue="Asia/Hong_Kong (UTC+8)" />
                  <Field label="Default order type" defaultValue="Market" />
                </div>
                <div className="mt-5 space-y-3">
                  <Toggle label="Confirm before placing order"   desc="Show a confirmation dialog before submitting trades" initial={true} />
                  <Toggle label="Reduce-only mode"               desc="Block orders that would increase position size" initial={false} />
                  <Toggle label="Hide small balances"            desc="Hide assets worth less than $1 in portfolio view" initial={true} />
                </div>
                <Save />
              </Section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] border border-pearl/[0.07] bg-gradient-to-br from-charcoal/40 to-obsidian/60 p-7">
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-pearl font-light tracking-tight">{title}</h2>
        <p className="text-xs text-muted mt-1.5">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, defaultValue, disabled }: { label: string; defaultValue: string; disabled?: boolean }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.2em] text-muted">{label}</label>
      <input
        defaultValue={defaultValue}
        disabled={disabled}
        className="mt-1.5 w-full px-4 py-2.5 bg-pearl/[0.03] border border-pearl/[0.10] rounded-xl text-pearl text-sm focus:outline-none focus:border-amber-300/40 disabled:text-muted disabled:cursor-not-allowed transition-colors"
      />
    </div>
  );
}

function Toggle({ label, desc, channel, initial }: { label: string; desc: string; channel?: string; initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <div className="flex items-center justify-between p-4 bg-pearl/[0.02] border border-pearl/[0.06] rounded-xl">
      <div className="flex-1 min-w-0">
        <div className="text-sm text-pearl font-medium">{label}</div>
        <div className="text-xs text-muted mt-1">{desc}{channel && ` · ${channel}`}</div>
      </div>
      <button onClick={() => setOn(!on)} className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${on ? 'bg-amber-400' : 'bg-pearl/[0.10]'}`}>
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-pearl transition-transform ${on ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}

function Save() {
  return (
    <div className="mt-6 flex justify-end gap-2">
      <button className="px-5 py-2.5 border border-pearl/[0.10] hover:border-pearl/[0.20] text-pearl text-sm rounded-full transition-colors">Cancel</button>
      <button className="px-5 py-2.5 bg-pearl hover:bg-amber-100 text-ink text-sm font-medium rounded-full transition-colors">Save changes</button>
    </div>
  );
}
