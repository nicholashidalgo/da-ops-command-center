export const slaTrend = [
  { month: 'May', value: 98.9 },
  { month: 'Jun', value: 99.1 },
  { month: 'Jul', value: 98.7 },
  { month: 'Aug', value: 99.3 },
  { month: 'Sep', value: 99.5 },
  { month: 'Oct', value: 99.2 },
  { month: 'Nov', value: 99.6 },
  { month: 'Dec', value: 98.8 },
  { month: 'Jan', value: 99.1 },
  { month: 'Feb', value: 99.4 },
  { month: 'Mar', value: 99.5 },
  { month: 'Apr', value: 99.4 }
]

export const slaByService = [
  { service: 'Data pipelines', value: 99.8 },
  { service: 'Reporting / BI', value: 99.5 },
  { service: 'Platform monitoring', value: 99.2 },
  { service: 'Visualization', value: 98.7 },
  { service: 'Data eng requests', value: 99.6 }
]

export const serviceMetrics = {
  slaAttainment: { value: '99.4%', delta: '+0.3%', direction: 'up' },
  p1p2Incidents: { value: '3', delta: '-2 vs prior', direction: 'up' },
  mttr: { value: '1.8h', delta: '-22%', direction: 'up' },
  dataQuality: { value: '96.1%', delta: '-0.4%', direction: 'warn' }
}

export const incidentMetrics = {
  total: { value: '18', delta: '-6 vs prior', direction: 'up' },
  repeat: { value: '2', delta: '-3 vs prior', direction: 'up' },
  avgResolution: { value: '2.4h', delta: '-18%', direction: 'up' },
  rcaRate: { value: '94%', delta: '+8%', direction: 'up' }
}

export const severityDistribution = [
  { name: 'P1', value: 3, color: '#ef4444' },
  { name: 'P2', value: 5, color: '#f59e0b' },
  { name: 'P3', value: 7, color: '#3b82f6' },
  { name: 'P4', value: 3, color: '#22c55e' }
]

export const incidentCategories = [
  { category: 'Pipeline failures', count: 7, color: '#8b5cf6' },
  { category: 'Data quality', count: 4, color: '#14b8a6' },
  { category: 'Platform outage', count: 3, color: '#f97316' },
  { category: 'Access / permissions', count: 2, color: '#3b82f6' },
  { category: 'Visualization errors', count: 2, color: '#64748b' }
]

export const resolutionTrend = [
  { month: 'Nov', mttr: 3.8, closed: 28 },
  { month: 'Dec', mttr: 3.5, closed: 24 },
  { month: 'Jan', mttr: 3.1, closed: 22 },
  { month: 'Feb', mttr: 2.9, closed: 20 },
  { month: 'Mar', mttr: 2.6, closed: 19 },
  { month: 'Apr', mttr: 2.4, closed: 18 }
]

export const demandMetrics = {
  openItems: { value: '34', delta: '+4 vs prior', direction: 'warn' },
  avgAge: { value: '12d', delta: '-3 days', direction: 'up' },
  throughput: { value: '8.2/wk', delta: '+1.4', direction: 'up' },
  utilization: { value: '87%', delta: 'Near ceiling', direction: 'warn' }
}

export const backlogByType = [
  { name: 'Incidents', value: 8, color: '#ef4444' },
  { name: 'Enhancements', value: 14, color: '#3b82f6' },
  { name: 'Modernization', value: 7, color: '#8b5cf6' },
  { name: 'Ad hoc', value: 5, color: '#64748b' }
]

export const backlogItems = [
  { name: 'SAP BW extractor timeout', type: 'Incident', priority: 'critical', age: '2d' },
  { name: 'Power BI gateway refresh failure', type: 'Incident', priority: 'high', age: '4d' },
  { name: 'Databricks job cost optimization', type: 'Enhancement', priority: 'high', age: '8d' },
  { name: 'ADF pipeline monitoring alerting', type: 'Modernization', priority: 'medium', age: '14d' },
  { name: 'Dashboard access audit cleanup', type: 'Ad hoc', priority: 'low', age: '18d' },
  { name: 'Snowflake warehouse auto-scaling tuning', type: 'Enhancement', priority: 'medium', age: '11d' },
  { name: 'SAC report performance degradation', type: 'Incident', priority: 'high', age: '3d' },
  { name: 'Data catalog metadata refresh', type: 'Enhancement', priority: 'low', age: '22d' }
]

export const costMetrics = {
  runRate: { value: '$142K', delta: 'Under budget', direction: 'up' },
  variance: { value: '-3.2%', delta: 'Favorable', direction: 'up' },
  utilization: { value: '87%', delta: 'Near ceiling', direction: 'warn' },
  fte: { value: '14.5', delta: 'Across 3 geos', direction: 'neutral' }
}

export const costBreakdown = [
  { category: 'Platform (Databricks / Snowflake)', amount: 48000 },
  { category: 'Team (onshore / offshore)', amount: 62000 },
  { category: 'Tooling (Power BI, ADF, monitoring)', amount: 18000 },
  { category: 'Vendor / 3rd party', amount: 14000 }
]

export const capacityByGeo = [
  { geo: 'Boston (US)', utilization: 92, status: 'hot' },
  { geo: 'Montreal', utilization: 85, status: 'normal' },
  { geo: 'Chennai', utilization: 78, status: 'healthy' }
]

export const costTrend = [
  { month: 'Nov', cost: 156 },
  { month: 'Dec', cost: 152 },
  { month: 'Jan', cost: 149 },
  { month: 'Feb', cost: 147 },
  { month: 'Mar', cost: 145 },
  { month: 'Apr', cost: 142 }
]

export const modernMetrics = {
  active: { value: '6', delta: '3 on track', direction: 'neutral' },
  debtRetired: { value: '12', delta: '+5 this quarter', direction: 'up' },
  automation: { value: '68%', delta: '+11% vs Q3', direction: 'up' },
  runbooks: { value: '91%', delta: '+7% vs Q3', direction: 'up' }
}

export const modernizationRoadmap = [
  { name: 'BOBJ to Power BI migration (wave 1)', status: 'done', pct: 100 },
  { name: 'CI/CD pipeline automation for ADF', status: 'done', pct: 100 },
  { name: 'BW4HANA to Datasphere conversion', status: 'progress', pct: 62 },
  { name: 'Snowflake cost governance framework', status: 'progress', pct: 45 },
  { name: 'Automated incident playbook rollout', status: 'progress', pct: 38 },
  { name: 'SAP Business Data Cloud integration', status: 'planned', pct: 0 }
]

export const techDebtTrend = [
  { quarter: 'Q1 FY25', open: 42, retired: 5 },
  { quarter: 'Q2 FY25', open: 35, retired: 7 },
  { quarter: 'Q3 FY25', open: 28, retired: 7 },
  { quarter: 'Q4 FY25', open: 22, retired: 12 }
]
