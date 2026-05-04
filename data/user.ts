// Demo user — pre-populated for the client demo.

export const USER = {
  firstName: 'Alex',
  lastName:  'Morgan',
  email:     'alex.morgan@ferno-demo.io',
  avatar:    'https://i.pravatar.cc/200?img=12',
  tier:      'Elite',
  joinedAt:  '2023-08-14',
  country:   'Hong Kong',
};

export const BALANCE = {
  total:      284_632.40,
  available:  142_184.20,
  locked:      78_400.00,
  cryptoUSD:   54_120.20,
  forexUSD:    21_800.00,
  todayPnl:    +3_412.80,
  todayPct:    +1.21,
  weekPnl:     +8_240.50,
  monthPnl:   +24_108.20,
};

export const PORTFOLIO = [
  { symbol: 'BTC',  qty: 0.74,    cost: 51200,   price: 67420.32, allocPct: 35.1 },
  { symbol: 'ETH',  qty: 8.32,    cost: 3120,    price: 3512.18,  allocPct: 18.4 },
  { symbol: 'SOL',  qty: 142,     cost: 124,     price: 142.07,   allocPct: 12.1 },
  { symbol: 'BNB',  qty: 18,      cost: 540,     price: 598.21,   allocPct: 8.7  },
  { symbol: 'AVAX', qty: 220,     cost: 31.5,    price: 36.84,    allocPct: 6.5  },
  { symbol: 'LINK', qty: 380,     cost: 12.8,    price: 14.82,    allocPct: 4.2  },
  { symbol: 'NEAR', qty: 600,     cost: 4.85,    price: 5.84,     allocPct: 4.0  },
  { symbol: 'ARB',  qty: 1800,    cost: 1.05,    price: 1.142,    allocPct: 2.4  },
  { symbol: 'USDT', qty: 24800,   cost: 1,       price: 1.00,     allocPct: 8.6  },
];

export const TRADES = [
  { id:'TRD-09812', pair:'BTC/USDT',  side:'long',  size: 0.12,  entry: 65800.00, exit: 67410.00, pnl:  +193.20,  pnlPct:  +2.45,  status:'closed', opened:'2026-04-30 14:22', closed:'2026-04-30 18:08' },
  { id:'TRD-09811', pair:'EUR/USD',   side:'short', size: 50000, entry: 1.08620,  exit: 1.08315,  pnl:  +152.50,  pnlPct:  +0.28,  status:'closed', opened:'2026-04-30 09:14', closed:'2026-04-30 12:40' },
  { id:'TRD-09810', pair:'ETH/USDT',  side:'long',  size: 1.5,   entry: 3380.00,  exit: 3512.18,  pnl:  +198.27,  pnlPct:  +3.91,  status:'closed', opened:'2026-04-29 22:01', closed:'2026-04-30 06:11' },
  { id:'TRD-09809', pair:'GBP/JPY',   side:'long',  size: 30000, entry: 194.20,   exit: 194.94,   pnl:  +144.20,  pnlPct:  +0.38,  status:'closed', opened:'2026-04-29 16:48', closed:'2026-04-30 01:30' },
  { id:'TRD-09808', pair:'SOL/USDT',  side:'long',  size: 30,    entry: 145.20,   exit: 142.07,   pnl:   -93.90,  pnlPct:  -2.16,  status:'closed', opened:'2026-04-29 13:02', closed:'2026-04-29 19:55' },
  { id:'TRD-09807', pair:'XAU/USD',   side:'long',  size: 5,     entry: 2310.00,  exit: 2328.10,  pnl:   +90.50,  pnlPct:  +0.78,  status:'closed', opened:'2026-04-29 08:30', closed:'2026-04-29 17:12' },
  { id:'TRD-09806', pair:'BTC/USDT',  side:'short', size: 0.05,  entry: 67200.00, exit: 67420.00, pnl:   -11.00,  pnlPct:  -0.32,  status:'closed', opened:'2026-04-28 21:18', closed:'2026-04-29 02:44' },
  { id:'TRD-09805', pair:'NEAR/USDT', side:'long',  size: 200,   entry: 5.42,     exit: 5.84,     pnl:   +84.00,  pnlPct:  +7.74,  status:'closed', opened:'2026-04-28 14:00', closed:'2026-04-29 11:22' },
  // Open positions
  { id:'TRD-09814', pair:'ETH/USDT',  side:'long',  size: 0.8,   entry: 3450.00,  exit: null,     pnl:   +49.74,  pnlPct:  +1.80,  status:'open',   opened:'2026-05-01 10:30', closed: null },
  { id:'TRD-09813', pair:'AAPL',      side:'long',  size: 25,    entry: 186.00,   exit: null,     pnl:   +86.25,  pnlPct:  +1.85,  status:'open',   opened:'2026-05-01 08:14', closed: null },
];

export const ACTIVITY = [
  { kind: 'trade',    label: 'Closed BTC/USDT long',      sub: '+$193.20 · 2.45%', time: '2h ago',   amount: +193.20, type: 'profit' },
  { kind: 'trade',    label: 'Opened ETH/USDT long',      sub: '0.8 ETH @ 3,450',  time: '3h ago',   amount: 2760.00, type: 'open'   },
  { kind: 'deposit',  label: 'Deposit confirmed',         sub: 'USDT (TRC-20)',    time: '5h ago',   amount: +5000.00, type: 'in'    },
  { kind: 'trade',    label: 'Closed EUR/USD short',      sub: '+$152.50',         time: '7h ago',   amount: +152.50, type: 'profit' },
  { kind: 'transfer', label: 'Withdrawal completed',      sub: 'BTC · 0.0218',     time: 'Yesterday', amount: -1500.00, type: 'out'   },
  { kind: 'trade',    label: 'Closed SOL/USDT long',      sub: '-$93.90',          time: 'Yesterday', amount: -93.90,  type: 'loss'  },
  { kind: 'tier',     label: 'Tier upgraded to Elite',    sub: '$400 bonus credited', time: '3 days ago', amount: +400.00, type: 'bonus' },
  { kind: 'trade',    label: 'Closed XAU/USD long',       sub: '+$90.50',          time: '3 days ago', amount: +90.50, type: 'profit' },
];

export const NOTIFICATIONS = [
  { id: 1, title: 'Trade closed: BTC/USDT', body: 'Your long position closed at +2.45%', time: '2h ago', read: false },
  { id: 2, title: 'Price alert: ETH', body: 'ETH crossed above $3,500',                  time: '3h ago', read: false },
  { id: 3, title: 'Deposit received',  body: '5,000 USDT credited to your account',      time: '5h ago', read: true  },
  { id: 4, title: 'Market open',       body: 'NYSE pre-market session has started',      time: 'Yesterday', read: true },
];

// Equity curve — 30 days
export const EQUITY_CURVE = (() => {
  const arr: { d: string; v: number }[] = [];
  let v = 260000;
  for (let i = 29; i >= 0; i--) {
    const date = new Date(); date.setDate(date.getDate() - i);
    v = v * (1 + (Math.sin(i * 0.4) * 0.008 + 0.001));
    v += (Math.random() - 0.4) * 800;
    arr.push({ d: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), v: Math.round(v) });
  }
  return arr;
})();

export const ALLOCATION = [
  { name: 'Bitcoin',     value: 49920, color: '#F7931A' },
  { name: 'Ethereum',    value: 29220, color: '#627EEA' },
  { name: 'Solana',      value: 20174, color: '#14F195' },
  { name: 'BNB',         value: 10768, color: '#F0B90B' },
  { name: 'Avalanche',   value:  8105, color: '#E84142' },
  { name: 'Stablecoins', value: 24800, color: '#26A17B' },
  { name: 'Other',       value: 19625, color: '#8a8470' },
];
