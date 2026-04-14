<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/nh-logo-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="assets/nh-logo-light.svg" />
    <img alt="NH" src="assets/nh-logo-dark.svg" width="80" />
  </picture>
</p>

<h1 align="center">D&A Operations Command Center</h1>

<p align="center"><b>Service owner dashboard for managed data & analytics operations</b></p>

<p align="center">
  <a href="https://da-ops.nicholashidalgo.com"><img src="https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Demo"></a>&nbsp;
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge" alt="License"></a>&nbsp;
  <img src="https://img.shields.io/badge/Tabs-5-3b82f6?style=for-the-badge" alt="Tabs">&nbsp;
  <img src="https://img.shields.io/badge/Charts-12-8b5cf6?style=for-the-badge" alt="Charts">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5-646cff?style=flat&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Recharts-2-ff6b6b?style=flat&logo=chartdotjs&logoColor=white" alt="Recharts" />
  <img src="https://img.shields.io/badge/Tailwind-3-06b6d4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Cloudflare_Pages-f38020?style=flat&logo=cloudflarepages&logoColor=white" alt="Cloudflare Pages" />
</p>

---

### What this does

<table>
<tr>
<td>

Interactive operations dashboard demonstrating how a **service owner** manages end-to-end D&A operations in a managed services model. Five operational views covering the full scope of data & analytics service delivery.

Built to show fluency in **SLA governance**, **incident management**, **demand prioritization**, **cost control**, and **platform modernization** across multi-geo delivery teams.

**5** operational tabs &middot; **12** interactive charts &middot; **34** simulated backlog items &middot; **Dark theme** optimized for screen share

</td>
</tr>
</table>

---

### Dashboard tabs

| Tab | View | Key metrics |
|-----|------|-------------|
| <img src="https://img.shields.io/badge/Service_Health-22c55e?style=flat-square" /> | SLA attainment by service area, 12-month trend | 99.4% SLA, 1.8h MTTR, 96.1% data quality |
| <img src="https://img.shields.io/badge/Incident_Funnel-ef4444?style=flat-square" /> | Severity distribution, category breakdown, resolution trend | 18 MTD, 94% RCA rate, -22% MTTR improvement |
| <img src="https://img.shields.io/badge/Demand_&_Backlog-3b82f6?style=flat-square" /> | Work type split, prioritized backlog, throughput | 34 open items, 8.2/wk throughput, 87% utilization |
| <img src="https://img.shields.io/badge/Cost_&_Capacity-f59e0b?style=flat-square" /> | Cost breakdown, geo capacity, 6-month cost trend | $142K run rate, -3.2% variance, 14.5 FTE |
| <img src="https://img.shields.io/badge/Modernization-8b5cf6?style=flat-square" /> | Roadmap tracker, tech debt reduction, automation coverage | 6 initiatives, 68% automation, 91% runbook compliance |

---

### Tech stack

| Component | Technology |
|-----------|------------|
| <img src="https://img.shields.io/badge/Frontend-61dafb?style=flat-square&logo=react&logoColor=white" /> | React 18 with functional components and hooks |
| <img src="https://img.shields.io/badge/Build-646cff?style=flat-square&logo=vite&logoColor=white" /> | Vite 5 with HMR |
| <img src="https://img.shields.io/badge/Charts-ff6b6b?style=flat-square&logo=chartdotjs&logoColor=white" /> | Recharts (area, bar, composed, pie) |
| <img src="https://img.shields.io/badge/Styling-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white" /> | Tailwind CSS 3 with custom dark theme |
| <img src="https://img.shields.io/badge/Icons-f56565?style=flat-square" /> | Lucide React |
| <img src="https://img.shields.io/badge/Deploy-f38020?style=flat-square&logo=cloudflarepages&logoColor=white" /> | Cloudflare Pages with custom domain |

---

### Local development

```bash
git clone https://github.com/nicholasjh-work/da-ops-command-center.git
cd da-ops-command-center
npm install
npm run dev
```

### Deploy

```bash
npm run build
npx wrangler pages deploy dist
```

---

### Project structure

```
src/
  App.jsx                    # Shell, tab nav, header/footer
  main.jsx                   # React mount
  index.css                  # Global styles, dark theme
  components/
    MetricCard.jsx           # Reusable KPI card
    HorizontalBar.jsx        # SLA/capacity bar
    ServiceHealth.jsx         # SLA tab
    IncidentFunnel.jsx        # Incident tab
    DemandBacklog.jsx         # Demand tab
    CostCapacity.jsx          # Cost tab
    Modernization.jsx         # Modernization tab
  data/
    operations.js            # Simulated ops data
```

---

<p align="center">
  <a href="https://linkedin.com/in/nicholashidalgo"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>&nbsp;
  <a href="https://nicholashidalgo.com"><img src="https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website"></a>&nbsp;
  <a href="mailto:analytics@nicholashidalgo.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
</p>
