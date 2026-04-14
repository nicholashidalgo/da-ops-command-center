import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import MetricCard from './MetricCard'
import { demandMetrics, backlogByType, backlogItems } from '../data/operations'

const priorityColors = {
  critical: 'bg-red-500',
  high: 'bg-amber-500',
  medium: 'bg-blue-500',
  low: 'bg-emerald-500'
}

const typeColors = {
  Incident: 'text-red-400 bg-red-400/10',
  Enhancement: 'text-blue-400 bg-blue-400/10',
  Modernization: 'text-violet-400 bg-violet-400/10',
  'Ad hoc': 'text-slate-400 bg-slate-400/10'
}

export default function DemandBacklog() {
  const m = demandMetrics

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Open backlog items" value={m.openItems.value} delta={m.openItems.delta} direction={m.openItems.direction} />
        <MetricCard label="Avg age" value={m.avgAge.value} delta={m.avgAge.delta} direction={m.avgAge.direction} />
        <MetricCard label="Throughput" value={m.throughput.value} delta={m.throughput.delta} direction={m.throughput.direction} />
        <MetricCard label="Capacity utilization" value={m.utilization.value} delta={m.utilization.delta} direction={m.utilization.direction} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="chart-card">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Backlog by work type</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={backlogByType} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" stroke="none" paddingAngle={2}>
                {backlogByType.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="fill-white">
                <tspan x="50%" dy="-6" fontSize="20" fontWeight="600" fontFamily="'JetBrains Mono', monospace">34</tspan>
                <tspan x="50%" dy="18" fontSize="10" fill="#94a3b8">items</tspan>
              </text>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-2 justify-center text-[11px] text-slate-500">
            {backlogByType.map(b => (
              <span key={b.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm inline-block" style={{ background: b.color }} />{b.name} ({b.value})
              </span>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Top backlog items</h3>
          <div className="space-y-0">
            {backlogItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${priorityColors[item.priority]}`} />
                <span className="flex-1 text-xs text-slate-300 truncate">{item.name}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${typeColors[item.type]}`}>{item.type}</span>
                <span className="text-[11px] font-mono text-slate-500 w-8 text-right shrink-0">{item.age}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
