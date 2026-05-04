'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ALLOCATION } from '@/data/user';

export default function AllocationPie() {
  const total = ALLOCATION.reduce((s, x) => s + x.value, 0);
  return (
    <div className="h-56 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={ALLOCATION} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2} stroke="none">
            {ALLOCATION.map((e, i) => <Cell key={i} fill={e.color} />)}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#13162a', border: '1px solid rgba(245,241,232,0.08)', borderRadius: 8, fontSize: 12 }}
            itemStyle={{ color: '#f5f1e8' }}
            formatter={(v: any) => `$${Number(v).toLocaleString()}`}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted">Total</div>
          <div className="font-serif text-2xl text-pearl font-light">${(total / 1000).toFixed(0)}K</div>
        </div>
      </div>
    </div>
  );
}
