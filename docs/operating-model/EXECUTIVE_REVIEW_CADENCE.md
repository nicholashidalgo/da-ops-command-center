# Executive Review Cadence

**Status:** Designed — cadence structure and workflow are reference operating model; no live executive review cycle is implemented or claimed

---

## 1. Purpose

The executive review cadence defines how senior stakeholders engage with data and analytics service performance: what they review, when, in what format, and what decisions are within scope at each level of the cadence.

It exists because operational detail and strategic decision-making operate at different time scales and require different levels of abstraction. Operational teams review metrics daily and weekly. Executives review trends, risk posture, investment alignment, and escalation items on a monthly and quarterly basis. Without a structured cadence, the connection between operational performance and strategic decision-making is informal, inconsistent, and easily lost.

This document is a reference operating model. It defines the cadence structure that a D&A service owner would implement to govern executive stakeholder engagement. No live executive review cycle is deployed in this repository.

---

## 2. Business Use Case

A data and analytics function that operates without structured executive engagement faces a predictable set of problems:

- **Invisible risk:** Deteriorating SLA attainment, growing tech debt, or capacity constraints accumulate without reaching the decision-makers who can authorize remediation.
- **Misaligned investment:** Budget decisions are made without visibility into operational health, resulting in underfunding operations while overfunding new initiatives that cannot be sustained.
- **Reactive communication:** Executives hear about significant incidents after the fact, without context, and without a clear picture of what changed.
- **Diffuse accountability:** Without a structured forum where modernization, capacity, and risk decisions are made, they default to whoever is loudest or most persistent.

The executive review cadence creates a predictable, structured channel where the right information reaches the right decision-makers at the right time, and where decisions produce documented actions with accountable owners.

---

## 3. Users and Stakeholders

| Role | Participation Level | Decision Authority |
|------|--------------------|--------------------|
| D&A Service Owner | Prepares and leads all review sessions. Primary presenter. | Recommends; escalates decisions requiring executive authority. |
| Executive Sponsor | Participates in monthly and quarterly reviews. | Investment decisions, headcount authorization, SLA renegotiation, strategic direction. |
| Finance Business Partner | Participates in monthly budget review and quarterly cost review. | Budget variance authorization, cost efficiency decisions. |
| Platform / Engineering Lead | Presents modernization and tech debt sections in quarterly review. | Technical prioritization within authorized budget and timeline. |
| Data Product Manager | Presents portfolio health section in quarterly review. | Product-level prioritization and adoption decisions. |
| Business Unit Stakeholders | Invited to quarterly portfolio review and when service impact is relevant. | Service-level expectations, demand prioritization input. |

---

## 4. Operating Model

The review cadence operates at three tiers. Each tier has a defined scope, preparation requirement, and decision boundary.

### Tier 1 — Weekly Operating Review

**Audience:** D&A service owner, delivery lead, ops manager  
**Format:** Standing meeting, 30–45 minutes  
**Scope:** Operational metrics only. No strategic decisions.

| Agenda Item | Owner | Inputs |
|-------------|-------|--------|
| Incident funnel review | Ops manager | Open P1/P2 count, MTTR, new incidents since last review, repeat incidents |
| Backlog health | Delivery lead | Open items, aging, throughput vs. target, critical items |
| Capacity check | Delivery lead | Utilization by geo, any geo approaching ceiling |
| SLA attainment preview | Ops manager | MTD SLA attainment by service area vs. target |
| Action items from prior week | Service owner | Open actions, owners, due dates |

**Decision scope:** Operational prioritization only. Escalation to executive tier if P1 incident is unresolved or SLA breach is imminent.

---

### Tier 2 — Monthly Operating Review

**Audience:** D&A service owner, executive sponsor, finance business partner, delivery lead  
**Format:** Scheduled meeting, 60 minutes  
**Scope:** Monthly performance trends, budget review, emerging risks, and escalation decisions.

#### Monthly Review Agenda

| Agenda Item | Duration | Owner | Inputs |
|-------------|---------|-------|--------|
| Scorecard summary | 10 min | Service owner | Full D&A Operations Scorecard (see `DATA_AND_ANALYTICS_OPERATIONS_SCORECARD.md`) |
| SLA attainment — month close | 10 min | Service owner | Attainment by service area, trend vs. prior 3 months, any breaches |
| Incident review | 10 min | Ops manager | Volume, severity distribution, RCA completion rate, repeat incidents, notable P1/P2 events |
| Budget and cost review | 10 min | Finance BP | Monthly run rate, budget variance, cost trend, forecast vs. budget |
| Capacity and demand | 10 min | Delivery lead | Utilization trend, open backlog vs. throughput, demand forecast for coming month |
| Escalation and decisions | 10 min | Service owner | Items requiring executive decision (authorization, prioritization, resource) |

#### Monthly Decision Scope

| Decision Type | Example | Authority |
|--------------|---------|-----------|
| Demand prioritization | Which enhancement backlog items are deferred due to capacity constraints? | Service owner, with executive sponsor agreement if stakeholder conflict |
| Budget variance authorization | Approve spending 3% over budget due to incident response overtime | Finance business partner |
| SLA remediation plan approval | Accept remediation plan for service area below target | Executive sponsor |
| Escalation to external stakeholders | Inform a business unit of SLA breach and remediation timeline | Service owner, with executive sponsor briefed |

---

### Tier 3 — Quarterly Business Review

**Audience:** D&A service owner, executive sponsor, finance business partner, platform/engineering lead, data product manager, business unit stakeholders (as relevant)  
**Format:** Structured review, 90–120 minutes  
**Scope:** Portfolio health, modernization progress, capacity plan, investment decisions, and risk posture for the coming quarter.

#### Quarterly Review Agenda

| Agenda Item | Duration | Owner | Inputs |
|-------------|---------|-------|--------|
| Service health summary (quarter close) | 15 min | Service owner | Full quarter SLA attainment, incident totals, MTTR trend, RCA completion rate |
| Portfolio health review | 20 min | Data product manager | Portfolio health metrics (see `PORTFOLIO_HEALTH_METRICS.md`), adoption trends, product risk summary |
| Tech debt and modernization review | 20 min | Platform / engineering lead | Debt retired QTD, active initiatives, roadmap status, automation coverage |
| Cost and capacity review | 15 min | Finance BP + delivery lead | Quarter cost actuals vs. budget, FTE utilization, capacity plan for next quarter |
| Risk posture review | 10 min | Service owner | Portfolio dependency risks, SLA trend risks, capacity risks, modernization risks |
| Investment decisions | 20 min | Executive sponsor | Headcount, tooling, debt retirement, initiative authorization for next quarter |

#### Quarterly Decision Scope

| Decision Type | Example | Authority |
|--------------|---------|-----------|
| Capacity investment | Authorize contractor engagement or headcount request to address utilization ceiling | Executive sponsor |
| Modernization prioritization | Accelerate BW4HANA migration, defer catalog metadata project | Executive sponsor, with service owner recommendation |
| Tech debt retirement investment | Allocate X% of engineering capacity to debt retirement for the quarter | Service owner, ratified by executive sponsor |
| SLA renegotiation | Adjust SLA target for a service area based on platform constraints | Executive sponsor, with business unit stakeholder agreement |
| Tooling investment | Approve new observability tooling or platform license expansion | Executive sponsor, finance BP authorization |
| Initiative authorization | Approve new modernization initiative for planning and resource allocation | Executive sponsor |

---

## 5. Architecture

### Review Preparation Workflow

A structured review only works if the preparation is consistent and the inputs are not assembled ad hoc the morning of the meeting.

```
[T-5 business days: Data pull]
  Ops manager pulls incident funnel snapshot (MTD close)
  Finance BP pulls cost actuals from accounting system
  Delivery lead pulls backlog and throughput snapshot
  Service owner pulls SLA attainment calculation

[T-3 business days: Analysis]
  Service owner reviews metrics, flags anomalies and notable trends
  Finance BP identifies variance items requiring explanation
  Engineering lead updates modernization roadmap status

[T-1 business day: Materials preparation]
  Scorecard slide or dashboard snapshot assembled
  Talking points prepared for each agenda item
  Decisions to be made identified and pre-positioned with executive sponsor
  Materials distributed to attendees

[Day of review]
  Review follows prepared agenda
  Decision items are documented as decisions reached or deferred
  Actions logged with owner and due date

[T+1 business day: Action log distributed]
  Meeting notes and action register distributed to all attendees
  Decision record updated
  Open actions tracked to following review
```

### Scorecard Usage in Reviews

The D&A Operations Scorecard (see [`DATA_AND_ANALYTICS_OPERATIONS_SCORECARD.md`](DATA_AND_ANALYTICS_OPERATIONS_SCORECARD.md)) is the primary data input for all three review tiers.

- **Weekly:** Ops-facing sections (incident funnel, backlog, capacity)
- **Monthly:** Full scorecard, one-page summary for executive audience
- **Quarterly:** Full scorecard plus portfolio-level extension

The interactive dashboard in this repository provides the visual framework for scorecard presentation. In the weekly and monthly cadences, the dashboard view (or a screenshot of it) can serve as the meeting artifact. In the quarterly cadence, a structured slide deck is typically required for executive audiences.

---

## 6. Controls

### Review Integrity Controls

| Control | Description |
|---------|------------|
| Fixed agenda | Agenda does not change week-to-week within a tier. Ad hoc topics are deferred unless urgent. |
| Pre-distributed materials | Materials are distributed at least one business day before the review. Reviews do not proceed without pre-read available. |
| Decision documentation | Every decision made in a review is logged with the decision, the deciding authority, and the date. |
| Action register | Every action assigned in a review has an owner, a due date, and a status reviewed in the following session. |
| Escalation log | Items escalated from weekly to monthly or from monthly to quarterly are tracked in a running escalation log. |
| No metric surprises rule | Any metric that is likely to generate significant executive concern is previewed with the executive sponsor before the review meeting. |

### SLA Attainment Review Controls

| Control | Description |
|---------|------------|
| Monthly close calculation | SLA attainment is calculated once at month close against the same methodology each month. Mid-month estimates are labeled as estimates. |
| Breach notification protocol | Any SLA breach is communicated to the affected stakeholder within 48 hours of month close, not withheld until the review meeting. |
| Trend-based flag | Any service area below target for two consecutive months is flagged for monthly review agenda regardless of current-month attainment. |
| Target change governance | SLA targets cannot be changed without a documented decision record, finance business partner review (for cost implications), and business unit stakeholder agreement. |

### Modernization Review Controls

| Control | Description |
|---------|------------|
| Initiative health gate | Every active modernization initiative is rated green/yellow/red at quarterly review based on schedule, scope, and resourcing. |
| Stalled initiative protocol | Any initiative rated red for two consecutive quarters triggers an explicit decision: re-scope, resource, or close. |
| Debt retirement tracking | Tech debt retirement progress is reviewed quarterly. A decline in retirement rate triggers engineering investment review. |
| Automation coverage threshold | Automation coverage below 60% triggers a quarterly prioritization discussion for automation backlog items. |

---

## 7. Workflow

### Monthly Review Decision Flow

```
Metrics distributed T-1 business day
  ↓
Review meeting (60 min)
  │
  ├─ Scorecard reviewed — all green?
  │    └─ Yes → Confirm actions, adjourn
  │    └─ No → Flag items for decision or escalation
  │
  ├─ Budget review — within variance tolerance?
  │    └─ Yes → Note and continue
  │    └─ No → Finance BP and service owner agree on response; document
  │
  ├─ Capacity review — any geo at ceiling?
  │    └─ Yes → Demand negotiation or headcount discussion initiated
  │    └─ No → Note capacity headroom
  │
  └─ Escalation items reviewed
       └─ Decision reached → Log with owner and date
       └─ Decision deferred → Log with reason, target date for resolution
  ↓
Action register distributed (T+1)
  ↓
Actions tracked to next review
```

### Quarterly Escalation Path

| Escalation Condition | Escalation Path | Response Requirement |
|---------------------|----------------|---------------------|
| SLA below target for 3+ consecutive months | Quarterly review agenda, executive sponsor decision required | Remediation plan or SLA renegotiation |
| Portfolio-level incident rate increasing QoQ | Engineering investment decision required | Capacity or modernization action |
| Modernization initiative stalled >2 quarters | Initiative decision required: re-scope, resource, or close | Explicit go/no-go with rationale |
| Capacity utilization > 90% for >2 months | Headcount or demand management decision | Resource plan or demand reduction agreement |
| Budget variance > +5% for 2+ months | Finance escalation, potential spend freeze | Revised forecast and remediation plan |

---

## 8. Operational Metrics

### Review Cadence Health Metrics

In addition to the D&A operational metrics reviewed in each session, the cadence itself has health metrics:

| Metric | Definition | Target | Tracked By |
|--------|-----------|--------|-----------|
| On-time review completion | Percentage of scheduled reviews that occur as scheduled, not rescheduled or cancelled | ≥ 90% of scheduled sessions | Service owner |
| Pre-read distribution rate | Percentage of reviews where materials are distributed at least 1 business day in advance | 100% | Service owner |
| Action close rate | Percentage of logged actions closed by their committed due date | ≥ 85% | Service owner |
| Decision documentation rate | Percentage of decisions made in reviews with a logged decision record | 100% | Service owner |
| Executive attendance | Percentage of monthly/quarterly reviews attended by executive sponsor | ≥ 80% | Service owner |

### Dashboard Integration

The D&A Operations Command Center dashboard provides the visual layer for scorecard review in weekly and monthly cadences. Relevant dashboard-to-cadence alignment:

| Review Tier | Primary Dashboard Sections Used |
|-------------|-------------------------------|
| Weekly | Incident Funnel tab, Demand & Backlog tab, Cost & Capacity tab |
| Monthly | All five tabs; Service Health tab for SLA summary; Modernization tab for initiative status |
| Quarterly | All tabs plus portfolio health supplement (see `PORTFOLIO_HEALTH_METRICS.md`) |

---

## 9. Workplace Application

The review cadence described here applies to any managed data and analytics function with:

- A defined set of executive stakeholders with decision authority
- A service commitment structure (SLAs, OLAs, or informal service expectations)
- A mixed operational and investment portfolio (run + change workload)
- A need to connect operational performance to strategic decision-making

Specific workplace applications:

- **Managed services governance:** When a D&A function operates under a managed services model with a client or internal sponsor, this cadence defines the governance structure for performance review and decision escalation.
- **Shared services center:** When a central analytics function serves multiple business units, this cadence provides the structured engagement model that prevents ad hoc stakeholder pressure from distorting priorities.
- **Platform modernization programs:** The quarterly review tier is the appropriate forum for modernization investment decisions, initiative authorization, and debt retirement prioritization.
- **New service owner onboarding:** This cadence structure can be implemented immediately when a new service owner takes over a D&A function. It does not require a mature operational system to begin — it can be run against whatever metrics are available while the data infrastructure matures.

The cadence is company-neutral and role-based. It does not assume any specific ITSM, BI, or governance tool. It can operate with a shared spreadsheet and a slide template in its simplest form and can scale to a fully integrated operational system as the function matures.

---

## 10. Limitations

- No live executive review cycle is implemented or running in this repository.
- The dashboard does not generate automated review materials, slide exports, or scheduled email digests.
- The weekly cadence requires a consistent operational data pull that is not automated in this repository (data is static sample).
- The quarterly portfolio review requires portfolio-level metric data that the current dashboard does not implement (see `PORTFOLIO_HEALTH_METRICS.md` for the gap analysis).
- The action register and decision log described in this document are reference structures. No persistent tracking system is implemented here.
- Executive attendance and action close rate cannot be measured without an implemented cadence — they are reference targets.

---

## 11. What This Does Not Claim

- This document does not claim a live executive review cadence is in operation.
- No review meeting has occurred using this cadence with actual stakeholders.
- No executive decision records described in this document represent real organizational decisions.
- No action registers, escalation logs, or decision documentation files exist as outputs of a real review process.
- The review frequency and agenda structures in this document are reference designs, not descriptions of a currently running governance process.

---

## 12. Extension Path

| Extension | Effort | Prerequisites |
|-----------|--------|--------------|
| Build automated weekly scorecard email digest | Medium | Server-side rendering, email integration (SendGrid, SES), scheduling |
| Add quarterly review slide template generator | Low | Static slide template, dashboard screenshot export |
| Implement persistent action register in the app | Medium | State management, local storage or API backend, action tracking component |
| Add executive summary view (single-page scorecard) | Low | New dashboard tab with high-level summary metrics only |
| Connect to calendar integration for review scheduling | Medium | Calendar API (Google, Outlook), review workflow automation |
| Build decision record database | Medium | Simple JSON-backed or Supabase-backed decision log with search |
| Add review health tracking (attendance, action close rate) | Low | Simple data model extension, new metric cards in scorecard |

---

## 13. Interview Talking Points

**On cadence design:**
The cadence works because it separates operational decisions from strategic decisions. Weekly reviews resolve operational issues at the team level. Monthly reviews surface trends and authorize responses. Quarterly reviews make investment decisions. Mixing these up — asking executives to weigh in on daily incident counts, or expecting ops teams to make quarterly investment decisions — wastes everyone's time and produces poor decisions.

**On the no-surprises rule:**
Any metric that is going to generate significant concern in an executive review needs to be previewed with the sponsor before the meeting. You never want an executive hearing about a three-month SLA miss for the first time in the review session. The meeting should be for decisions, not for shock.

**On pre-read discipline:**
A review meeting where attendees are reading the materials for the first time during the session is not a review — it's a presentation. Pre-read distribution at least one business day before the meeting is a non-negotiable structural requirement for the cadence to function.

**On action accountability:**
Every action logged in a review needs an owner and a due date. "The team will look into it" is not an action. If the action close rate drops below 85%, the cadence is producing work that isn't being done — which means either the actions are too vague, the owners don't have capacity, or the follow-through structure isn't working.

**On quarterly decision scope:**
The quarterly review is where modernization investments get authorized or denied. If the quarterly review does not produce explicit go/no-go decisions on stalled initiatives, those initiatives will consume resources indefinitely without progress. The stalled initiative protocol — two quarters red triggers an explicit decision — prevents strategic drift.

**On connecting operations to strategy:**
The purpose of the review cadence is to make the connection between daily operational performance and quarterly strategic investment legible to executives who cannot participate in the daily operational detail. A service owner who runs this cadence well can walk into any executive conversation and explain not just what the numbers are, but what decisions they imply and what resources are needed to improve them.
