'use client';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { EQUITY_CURVE } from '@/data/user';

export default function EquityChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={EQUITY_CURVE} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="equity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3cb47" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#f3cb47" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="d" tick={{ fill: '#8a8470', fontSize: 11 }} axisLine={false} tickLine={false} interval={4} />
          <YAxis hide domain={['dataMin - 2000', 'dataMax + 2000']} />
          <Tooltip
            contentStyle={{ backgroundColor: '#13162a', border: '1px solid rgba(245,241,232,0.08)', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: '#8a8470' }}
            itemStyle={{ color: '#f5f1e8' }}
            formatter={(v: any) => [`$${Number(v).toLocaleString()}`, 'Equity']}
          />
          <Area type="monotone" dataKey="v" stroke="#f3cb47" strokeWidth={2} fill="url(#equity)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
