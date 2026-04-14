import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart, Area } from 'recharts'
import MetricCard from './MetricCard'
import { incidentMetrics, severityDistribution, incidentCategories, resolutionTrend } from '../data/operations'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-slate-400 mb-1">{label || payload[0]?.name}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-white font-mono font-medium">{p.name}: {p.value}{typeof p.value === 'number' && p.value < 10 ? 'h' : ''}</p>
      ))}
    </div>
  )
}

function DonutCenter({ value, label }) {
  return (
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="fill-white">
      <tspan x="50%" dy="-6" fontSize="20" fontWeight="600" fontFamily="'JetBrains Mono', monospace">{value}</tspan>
      <tspan x="50%" dy="18" fontSize="10" fill="#94a3b8">{label}</tspan>
    </text>
  )
}

export default function IncidentFunnel() {
  const m = incidentMetrics

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Total incidents (MTD)" value={m.total.value} delta={m.total.delta} direction={m.total.direction} />
        <MetricCard label="Repeat incidents" value={m.repeat.value} delta={m.repeat.delta} direction={m.repeat.direction} />
        <MetricCard label="Avg resolution" value={m.avgResolution.value} delta={m.avgResolution.delta} direction={m.avgResolution.direction} />
        <MetricCard label="RCA completion rate" value={m.rcaRate.value} delta={m.rcaRate.delta} direction={m.rcaRate.direction} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="chart-card">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Severity distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={severityDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" stroke="none" paddingAngle={2}>
                {severityDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <DonutCenter value="18" label="total" />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center text-[11px] text-slate-500">
            {severityDistribution.map(s => (
              <span key={s.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm inline-block" style={{ background: s.color }} />{s.name} ({s.value})
              </span>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Category breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={incidentCategories} layout="vertical" margin={{ top: 0, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={120} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={18}>
                {incidentCategories.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Resolution trend (6 months)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={resolutionTrend} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 5]} tickFormatter={v => `${v}h`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 40]} />
            <Tooltip content={<ChartTooltip />} />
            <Bar yAxisId="right" dataKey="closed" fill="rgba(34,197,94,0.2)" radius={[4, 4, 0, 0]} barSize={28} name="Closed" />
            <Line yAxisId="left" type="monotone" dataKey="mttr" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} name="MTTR" />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex gap-5 mt-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-blue-500 rounded-full inline-block" />Avg resolution (hrs)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500/20 rounded-sm inline-block" />Incidents closed</span>
        </div>
      </div>
    </div>
  )
}
