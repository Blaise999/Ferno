'use client';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';

type Props = { data: number[]; up?: boolean };

export default function TradeChart({ data, up = true }: Props) {
  const chartData = data.map((v, i) => ({ i, v }));
  const color = up ? '#3aa978' : '#d8493e';

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="trade-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="i" hide />
          <YAxis tick={{ fill: '#8a8470', fontSize: 11 }} axisLine={false} tickLine={false} domain={['dataMin', 'dataMax']} orientation="right" />
          <Tooltip
            contentStyle={{ backgroundColor: '#13162a', border: '1px solid rgba(245,241,232,0.08)', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: '#8a8470' }}
            itemStyle={{ color: '#f5f1e8' }}
          />
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill="url(#trade-area)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
