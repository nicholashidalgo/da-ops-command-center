import { TrendingUp, TrendingDown, AlertTriangle, Minus } from 'lucide-react'

const directionConfig = {
  up: { icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  down: { icon: TrendingDown, color: 'text-red-400', bg: 'bg-red-400/10' },
  warn: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  neutral: { icon: Minus, color: 'text-slate-400', bg: 'bg-slate-400/10' }
}

export default function MetricCard({ label, value, delta, direction = 'neutral' }) {
  const config = directionConfig[direction] || directionConfig.neutral
  const Icon = config.icon

  return (
    <div className="metric-card">
      <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-1 font-medium">{label}</p>
      <p className="text-2xl font-semibold text-white font-mono tracking-tight">{value}</p>
      {delta && (
        <div className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[11px] font-medium ${config.bg} ${config.color}`}>
          <Icon size={11} />
          <span>{delta}</span>
        </div>
      )}
    </div>
  )
}
