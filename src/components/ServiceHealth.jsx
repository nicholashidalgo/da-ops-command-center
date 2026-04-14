import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Area, AreaChart } from 'recharts'
import MetricCard from './MetricCard'
import HorizontalBar from './HorizontalBar'
import { serviceMetrics, slaTrend, slaByService } from '../data/operations'

function SLATooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-slate-400 mb-1">{label}</p>
      <p className="text-white font-mono font-medium">{payload[0].value.toFixed(1)}%</p>
    </div>
  )
}

export default function ServiceHealth() {
  const m = serviceMetrics

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="SLA attainment" value={m.slaAttainment.value} delta={m.slaAttainment.delta} direction={m.slaAttainment.direction} />
        <MetricCard label="P1/P2 incidents (MTD)" value={m.p1p2Incidents.value} delta={m.p1p2Incidents.delta} direction={m.p1p2Incidents.direction} />
        <MetricCard label="MTTR" value={m.mttr.value} delta={m.mttr.delta} direction={m.mttr.direction} />
        <MetricCard label="Data quality score" value={m.dataQuality.value} delta={m.dataQuality.delta} direction={m.dataQuality.direction} />
      </div>

      <div className="chart-card">
        <h3 className="text-sm font-medium text-slate-300 mb-4">SLA performance by service area</h3>
        <div className="space-y-1">
          {slaByService.map(s => (
            <HorizontalBar key={s.service} label={s.service} value={s.value} />
          ))}
        </div>
      </div>

      <div className="chart-card">
        <h3 className="text-sm font-medium text-slate-300 mb-4">12-month SLA trend</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={slaTrend} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="slaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis domain={[98, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<SLATooltip />} />
            <ReferenceLine y={99.0} stroke="#ef4444" strokeDasharray="6 4" strokeWidth={1.5} strokeOpacity={0.4} />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#slaGrad)" dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#3b82f6' }} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex gap-5 mt-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-blue-500 rounded-full inline-block" />SLA attainment</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-red-500/40 rounded-full inline-block" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, #ef4444 2px, #ef4444 4px)' }} />Target (99.0%)</span>
        </div>
      </div>
    </div>
  )
}
