/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        ink:        '#06070d',
        obsidian:   '#0b0d18',
        charcoal:   '#13162a',
        slate:      '#1e2240',
        // Brand
        amber: {
          50:'#fdf8e7',100:'#fbeec1',200:'#f7dd84',300:'#f3cb47',
          400:'#efbb1b',500:'#d4a008',600:'#a17905',700:'#6d5104',
        },
        ember:      '#f3cb47',
        ferno:      '#ef9d1b',
        // Pearl/cream — warm whites
        pearl:      '#f5f1e8',
        sand:       '#e0d9c6',
        muted:      '#8a8470',
        // PnL
        bull:       '#3aa978',
        bear:       '#d8493e',
      },
      fontFamily: {
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'ticker':   'ticker 60s linear infinite',
        'aurora':   'aurora 20s ease infinite',
        'float':    'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.8s ease-in-out infinite',
      },
      keyframes: {
        ticker: { '0%':{transform:'translateX(0)'},'100%':{transform:'translateX(-50%)'} },
        aurora: { '0%,100%':{backgroundPosition:'0% 50%'},'50%':{backgroundPosition:'100% 50%'} },
        float: { '0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-12px)'} },
        pulseSoft: { '0%,100%':{opacity:'0.4'},'50%':{opacity:'0.8'} },
      },
      backgroundImage: {
        'aurora':   'linear-gradient(120deg, rgba(243,203,71,0.18), rgba(239,157,27,0.12), rgba(212,160,8,0.10), rgba(243,203,71,0.18))',
        'grid':     'linear-gradient(to right, rgba(243,203,71,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(243,203,71,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
