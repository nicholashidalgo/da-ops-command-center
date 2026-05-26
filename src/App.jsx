import { useState } from 'react'
import { Activity, AlertTriangle, LayoutList, DollarSign, Rocket } from 'lucide-react'
import ServiceHealth from './components/ServiceHealth'
import IncidentFunnel from './components/IncidentFunnel'
import DemandBacklog from './components/DemandBacklog'
import CostCapacity from './components/CostCapacity'
import Modernization from './components/Modernization'

const tabs = [
  { id: 'health', label: 'Service health', icon: Activity },
  { id: 'incidents', label: 'Incident funnel', icon: AlertTriangle },
  { id: 'demand', label: 'Demand & backlog', icon: LayoutList },
  { id: 'cost', label: 'Cost & capacity', icon: DollarSign },
  { id: 'modern', label: 'Modernization', icon: Rocket }
]

const panels = {
  health: ServiceHealth,
  incidents: IncidentFunnel,
  demand: DemandBacklog,
  cost: CostCapacity,
  modern: Modernization
}

export default function App() {
  const [active, setActive] = useState('health')
  const Panel = panels[active]

  return (
    <div className="min-h-screen bg-slate-925">
      <header className="border-b border-white/[0.06] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto py-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold tracking-tight">NH</div>
            <h1 className="text-base font-semibold text-white tracking-tight">D&A operations command center</h1>
          </div>
          <p className="text-xs text-slate-500 sm:ml-auto">Nicholas Hidalgo &middot; Service owner view &middot; April 2026</p>
        </div>
      </header>

      <nav className="border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex gap-1 py-2">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white/[0.08] text-white'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </nav>

      <main className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <Panel />
        </div>
      </main>

      <footer className="border-t border-white/[0.06] px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-2 text-[11px] text-slate-600">
          <span>Nicholas Hidalgo</span>
          <span className="hidden sm:inline">&middot;</span>
          <a href="https://nicholashidalgo.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 transition-colors">nicholashidalgo.com</a>
          <span className="hidden sm:inline">&middot;</span>
          <a href="https://linkedin.com/in/nicholasjh" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 transition-colors">LinkedIn</a>
          <span className="sm:ml-auto">D&A Operations Command Center</span>
        </div>
      </footer>
    </div>
  )
}
