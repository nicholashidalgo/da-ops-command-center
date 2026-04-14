import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CheckCircle2, Loader2, Circle } from 'lucide-react'
import MetricCard from './MetricCard'
import { modernMetrics, modernizationRoadmap, techDebtTrend } from '../data/operations'

const statusConfig = {
  done: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Complete' },
  progress: { icon: Loader2, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'In progress' },
  planned: { icon: Circle, color: 'text-slate-500', bg: 'bg-slate-500/10', label: 'Planned' }
}

function DebtTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-white font-mono font-medium">{p.name}: {p.value}</p>
      ))}
    </div>
  )
}

export default function Modernization() {
  const m = modernMetrics

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Initiatives active" value={m.active.value} delta={m.active.delta} direction={m.active.direction} />
        <MetricCard label="Tech debt items retired" value={m.debtRetired.value} delta={m.debtRetired.delta} direction={m.debtRetired.direction} />
        <MetricCard label="Automation coverage" value={m.automation.value} delta={m.automation.delta} direction={m.automation.direction} />
        <MetricCard label="Runbook compliance" value={m.runbooks.value} delta={m.runbooks.delta} direction={m.runbooks.direction} />
      </div>

      <div className="chart-card">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Modernization roadmap</h3>
        <div className="space-y-0">
          {modernizationRoadmap.map((item, i) => {
            const config = statusConfig[item.status]
            const Icon = config.icon
            return (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-white/[0.04] last:border-0">
                <Icon size={16} className={config.color} />
                <span className="flex-1 text-xs text-slate-300">{item.name}</span>
                <div className="w-24 h-1.5 bg-white/[0.04] rounded-full overflow-hidden shrink-0">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${item.status === 'done' ? 'bg-emerald-400' : item.status === 'progress' ? 'bg-blue-400' : 'bg-slate-600'}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-500 w-10 text-right">{item.pct}%</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="chart-card">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Tech debt reduction (quarterly)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={techDebtTrend} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 50]} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 20]} />
            <Tooltip content={<DebtTooltip />} />
            <Bar yAxisId="left" dataKey="open" fill="rgba(139,92,246,0.2)" radius={[4, 4, 0, 0]} barSize={32} name="Open items" />
            <Line yAxisId="right" type="monotone" dataKey="retired" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: '#22c55e', strokeWidth: 0 }} name="Retired" />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex gap-5 mt-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-violet-500/20 rounded-sm inline-block" />Open tech debt items</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-emerald-500 rounded-full inline-block" />Retired this quarter</span>
        </div>
      </div>
    </div>
  )
}
