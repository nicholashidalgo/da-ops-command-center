const statusColor = (value, threshold = 99.0) => {
  if (value >= threshold) return 'bg-emerald-400'
  if (value >= threshold - 0.5) return 'bg-amber-400'
  return 'bg-red-400'
}

export default function HorizontalBar({ label, value, max = 100, suffix = '%', colorFn }) {
  const pct = Math.min((value / max) * 100, 100)
  const barColor = colorFn ? colorFn(value) : statusColor(value)

  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="text-xs text-slate-400 w-[110px] shrink-0 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-mono font-medium text-slate-300 w-[48px] text-right">
        {typeof value === 'number' ? value.toFixed(1) : value}{suffix}
      </span>
    </div>
  )
}
