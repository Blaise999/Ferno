// Seeded crypto market data — realistic, no API needed.
// Sparkline = last 24h hourly closes (24 points).

export type Crypto = {
  symbol: string;
  name: string;
  pair: string;       // BTC/USDT
  logo: string;
  price: number;
  change24h: number;  // percent
  volume24h: number;  // USD
  marketCap: number;
  high24h: number;
  low24h: number;
  spark: number[];
};

function spark(base: number, vol: number, drift: number = 0): number[] {
  const arr: number[] = [];
  let p = base * 0.985;
  for (let i = 0; i < 48; i++) {
    p = p * (1 + (Math.sin(i * 0.7) * vol + drift / 48));
    p += (Math.random() - 0.5) * base * 0.0008;
    arr.push(Number(p.toFixed(base < 1 ? 6 : 2)));
  }
  return arr;
}

export const CRYPTO: Crypto[] = [
  { symbol: 'BTC',  name: 'Bitcoin',         pair: 'BTC/USDT', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    price: 67420.32,  change24h: 2.42,  volume24h: 28_400_000_000, marketCap: 1_320_000_000_000, high24h: 68210.40, low24h: 65880.10, spark: spark(67000, 0.004, 0.03) },
  { symbol: 'ETH',  name: 'Ethereum',        pair: 'ETH/USDT', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    price: 3512.18,   change24h: 1.84,  volume24h: 14_200_000_000, marketCap: 422_000_000_000,   high24h: 3551.80,  low24h: 3445.20,  spark: spark(3470, 0.005, 0.02) },
  { symbol: 'SOL',  name: 'Solana',          pair: 'SOL/USDT', logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    price: 142.07,    change24h: -0.91, volume24h: 3_800_000_000,  marketCap: 65_000_000_000,    high24h: 144.50,   low24h: 140.20,   spark: spark(143, 0.006, -0.01) },
  { symbol: 'BNB',  name: 'BNB',             pair: 'BNB/USDT', logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    price: 598.21,    change24h: 1.07,  volume24h: 1_700_000_000,  marketCap: 89_000_000_000,    high24h: 604.50,   low24h: 590.10,   spark: spark(594, 0.003, 0.012) },
  { symbol: 'XRP',  name: 'XRP',             pair: 'XRP/USDT', logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    price: 0.6241,    change24h: 0.84,  volume24h: 1_400_000_000,  marketCap: 35_000_000_000,    high24h: 0.6311,   low24h: 0.6172,   spark: spark(0.62, 0.004, 0.01) },
  { symbol: 'ADA',  name: 'Cardano',         pair: 'ADA/USDT', logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    price: 0.5128,    change24h: -1.42, volume24h: 640_000_000,    marketCap: 18_000_000_000,    high24h: 0.5240,   low24h: 0.5081,   spark: spark(0.515, 0.005, -0.015) },
  { symbol: 'DOGE', name: 'Dogecoin',        pair: 'DOGE/USDT', logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
    price: 0.1583,    change24h: 3.21,  volume24h: 2_100_000_000,  marketCap: 23_000_000_000,    high24h: 0.1612,   low24h: 0.1498,   spark: spark(0.155, 0.008, 0.04) },
  { symbol: 'AVAX', name: 'Avalanche',       pair: 'AVAX/USDT', logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    price: 36.84,     change24h: 1.92,  volume24h: 480_000_000,    marketCap: 14_000_000_000,    high24h: 37.40,    low24h: 35.90,    spark: spark(36.4, 0.005, 0.02) },
  { symbol: 'DOT',  name: 'Polkadot',        pair: 'DOT/USDT', logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    price: 7.42,      change24h: -0.38, volume24h: 280_000_000,    marketCap: 10_000_000_000,    high24h: 7.51,     low24h: 7.34,     spark: spark(7.4, 0.004, -0.005) },
  { symbol: 'MATIC',name: 'Polygon',         pair: 'MATIC/USDT', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    price: 0.7231,    change24h: 2.12,  volume24h: 410_000_000,    marketCap: 7_200_000_000,     high24h: 0.7340,   low24h: 0.7080,   spark: spark(0.72, 0.005, 0.025) },
  { symbol: 'LINK', name: 'Chainlink',       pair: 'LINK/USDT', logo: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    price: 14.82,     change24h: 0.94,  volume24h: 320_000_000,    marketCap: 8_900_000_000,     high24h: 15.04,    low24h: 14.61,    spark: spark(14.7, 0.004, 0.012) },
  { symbol: 'LTC',  name: 'Litecoin',        pair: 'LTC/USDT', logo: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
    price: 84.51,     change24h: -0.62, volume24h: 410_000_000,    marketCap: 6_300_000_000,     high24h: 85.40,    low24h: 83.92,    spark: spark(84.6, 0.003, -0.008) },
  { symbol: 'ATOM', name: 'Cosmos',          pair: 'ATOM/USDT', logo: 'https://cryptologos.cc/logos/cosmos-atom-logo.png',
    price: 8.22,      change24h: 1.41,  volume24h: 180_000_000,    marketCap: 3_200_000_000,     high24h: 8.35,     low24h: 8.10,     spark: spark(8.2, 0.005, 0.018) },
  { symbol: 'NEAR', name: 'NEAR Protocol',   pair: 'NEAR/USDT', logo: 'https://cryptologos.cc/logos/near-protocol-near-logo.png',
    price: 5.84,      change24h: 4.31,  volume24h: 240_000_000,    marketCap: 6_300_000_000,     high24h: 6.04,     low24h: 5.61,     spark: spark(5.7, 0.007, 0.05) },
  { symbol: 'UNI',  name: 'Uniswap',         pair: 'UNI/USDT', logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
    price: 9.84,      change24h: -2.18, volume24h: 220_000_000,    marketCap: 5_800_000_000,     high24h: 10.12,    low24h: 9.71,     spark: spark(9.95, 0.006, -0.025) },
  { symbol: 'ARB',  name: 'Arbitrum',        pair: 'ARB/USDT', logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
    price: 1.142,     change24h: 1.83,  volume24h: 320_000_000,    marketCap: 3_900_000_000,     high24h: 1.158,    low24h: 1.121,    spark: spark(1.13, 0.005, 0.022) },
];
