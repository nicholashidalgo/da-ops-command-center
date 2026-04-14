import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import MetricCard from './MetricCard'
import HorizontalBar from './HorizontalBar'
import { costMetrics, costBreakdown, capacityByGeo, costTrend } from '../data/operations'

const capacityColor = (val) => {
  if (val >= 90) return 'bg-red-400'
  if (val >= 85) return 'bg-amber-400'
  return 'bg-emerald-400'
}

function CostTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-slate-400 mb-1">{label}</p>
      <p className="text-white font-mono font-medium">${payload[0].value}K</p>
    </div>
  )
}

export default function CostCapacity() {
  const m = costMetrics
  const total = costBreakdown.reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Monthly run rate" value={m.runRate.value} delta={m.runRate.delta} direction={m.runRate.direction} />
        <MetricCard label="Budget variance" value={m.variance.value} delta={m.variance.delta} direction={m.variance.direction} />
        <MetricCard label="Team utilization" value={m.utilization.value} delta={m.utilization.delta} direction={m.utilization.direction} />
        <MetricCard label="FTE equivalents" value={m.fte.value} delta={m.fte.delta} direction={m.fte.direction} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="chart-card">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Cost breakdown</h3>
          <div className="space-y-3">
            {costBreakdown.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{c.category}</span>
                <span className="font-mono font-medium text-slate-200">${(c.amount / 1000).toFixed(0)}K</span>
              </div>
            ))}
            <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between text-xs">
              <span className="text-slate-200 font-medium">Total monthly</span>
              <span className="font-mono font-medium text-white">${(total / 1000).toFixed(0)}K</span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Capacity by geography</h3>
          <div className="space-y-2 mb-6">
            {capacityByGeo.map(g => (
              <HorizontalBar key={g.geo} label={g.geo} value={g.utilization} suffix="%" colorFn={capacityColor} />
            ))}
          </div>
          <h3 className="text-sm font-medium text-slate-300 mb-4">6-month cost trend</h3>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={costTrend} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[130, 165]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
              <Tooltip content={<CostTooltip />} />
              <Area type="monotone" dataKey="cost" stroke="#22c55e" strokeWidth={2} fill="url(#costGrad)" dot={{ r: 2.5, fill: '#22c55e', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
