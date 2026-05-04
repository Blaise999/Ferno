export type Forex = {
  pair: string;
  base: string;
  quote: string;
  bid: number;
  ask: number;
  change24h: number;
  high24h: number;
  low24h: number;
  spread: number;     // pips
  category: 'major' | 'minor' | 'exotic';
  spark: number[];
};

function spark(base: number, vol: number, drift: number = 0): number[] {
  const arr: number[] = [];
  let p = base * 0.997;
  for (let i = 0; i < 48; i++) {
    p = p * (1 + (Math.cos(i * 0.55) * vol + drift / 48));
    p += (Math.random() - 0.5) * base * 0.0003;
    arr.push(Number(p.toFixed(5)));
  }
  return arr;
}

export const FOREX: Forex[] = [
  { pair: 'EUR/USD', base: 'EUR', quote: 'USD', bid: 1.08315, ask: 1.08325, change24h: 0.12,  high24h: 1.0851, low24h: 1.0820, spread: 1, category: 'major',  spark: spark(1.083, 0.0008, 0.002) },
  { pair: 'GBP/USD', base: 'GBP', quote: 'USD', bid: 1.26405, ask: 1.26415, change24h: -0.08, high24h: 1.2658, low24h: 1.2632, spread: 1, category: 'major',  spark: spark(1.264, 0.0009, -0.001) },
  { pair: 'USD/JPY', base: 'USD', quote: 'JPY', bid: 154.205, ask: 154.215, change24h: 0.34,  high24h: 154.45, low24h: 153.81, spread: 1, category: 'major',  spark: spark(154.2, 0.0007, 0.005) },
  { pair: 'USD/CHF', base: 'USD', quote: 'CHF', bid: 0.91120, ask: 0.91135, change24h: 0.21,  high24h: 0.9134, low24h: 0.9091, spread: 1.5, category: 'major', spark: spark(0.911, 0.0008, 0.003) },
  { pair: 'AUD/USD', base: 'AUD', quote: 'USD', bid: 0.65920, ask: 0.65930, change24h: -0.42, high24h: 0.6618, low24h: 0.6580, spread: 1, category: 'major',  spark: spark(0.66, 0.0009, -0.005) },
  { pair: 'USD/CAD', base: 'USD', quote: 'CAD', bid: 1.36285, ask: 1.36295, change24h: 0.08,  high24h: 1.3651, low24h: 1.3614, spread: 1, category: 'major',  spark: spark(1.363, 0.0007, 0.001) },
  { pair: 'NZD/USD', base: 'NZD', quote: 'USD', bid: 0.59815, ask: 0.59825, change24h: -0.18, high24h: 0.5998, low24h: 0.5965, spread: 1, category: 'major',  spark: spark(0.598, 0.0008, -0.002) },
  { pair: 'USD/HKD', base: 'USD', quote: 'HKD', bid: 7.81075, ask: 7.81085, change24h: 0.02,  high24h: 7.8120, low24h: 7.8095, spread: 1, category: 'minor',  spark: spark(7.811, 0.0001, 0) },
  { pair: 'USD/CNY', base: 'USD', quote: 'CNY', bid: 7.24175, ask: 7.24185, change24h: -0.04, high24h: 7.2435, low24h: 7.2380, spread: 1, category: 'minor',  spark: spark(7.241, 0.0002, 0) },
  { pair: 'USD/SGD', base: 'USD', quote: 'SGD', bid: 1.34520, ask: 1.34540, change24h: 0.14,  high24h: 1.3471, low24h: 1.3434, spread: 2, category: 'minor',  spark: spark(1.345, 0.0006, 0.002) },
  { pair: 'EUR/GBP', base: 'EUR', quote: 'GBP', bid: 0.85705, ask: 0.85720, change24h: 0.18,  high24h: 0.8584, low24h: 0.8559, spread: 1.5, category: 'minor', spark: spark(0.857, 0.0007, 0.002) },
  { pair: 'EUR/JPY', base: 'EUR', quote: 'JPY', bid: 167.040, ask: 167.060, change24h: 0.45,  high24h: 167.42, low24h: 166.55, spread: 2, category: 'minor',  spark: spark(166.9, 0.0009, 0.005) },
  { pair: 'GBP/JPY', base: 'GBP', quote: 'JPY', bid: 194.940, ask: 194.970, change24h: 0.27,  high24h: 195.36, low24h: 194.45, spread: 3, category: 'minor',  spark: spark(194.8, 0.001, 0.004) },
  { pair: 'XAU/USD', base: 'XAU', quote: 'USD', bid: 2328.05, ask: 2328.15, change24h: 0.45,  high24h: 2335.20, low24h: 2317.40, spread: 0.10, category: 'major', spark: spark(2325, 0.001, 0.005) },
  { pair: 'XAG/USD', base: 'XAG', quote: 'USD', bid: 27.32,   ask: 27.34,   change24h: 0.92,  high24h: 27.50,  low24h: 27.05,   spread: 0.02, category: 'major', spark: spark(27.2, 0.002, 0.012) },
  { pair: 'USD/MXN', base: 'USD', quote: 'MXN', bid: 17.04,   ask: 17.06,   change24h: -0.31, high24h: 17.12,  low24h: 16.98,   spread: 2, category: 'exotic', spark: spark(17.05, 0.0008, -0.003) },
  { pair: 'USD/TRY', base: 'USD', quote: 'TRY', bid: 38.482,  ask: 38.512,  change24h: 0.62,  high24h: 38.61,  low24h: 38.20,   spread: 30, category: 'exotic', spark: spark(38.4, 0.0015, 0.008) },
  { pair: 'USD/ZAR', base: 'USD', quote: 'ZAR', bid: 18.412,  ask: 18.428,  change24h: -0.18, high24h: 18.49,  low24h: 18.36,   spread: 16, category: 'exotic', spark: spark(18.42, 0.0009, -0.002) },
];
