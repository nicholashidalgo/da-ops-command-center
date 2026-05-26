# D&A Operations Scorecard

**Status:** Designed — dashboard-rendered view implemented; governance workflow is reference operating model

---

## 1. Purpose

The D&A Operations Scorecard is the single-page summary a service owner uses to assess whether the data and analytics function is operating within acceptable bounds across every dimension that matters to the business: service reliability, incident control, delivery output, cost discipline, workforce capacity, data product health, and platform modernization progress.

It is not a vanity dashboard. Every metric on the scorecard has a defined owner, a target threshold, a review cadence, and a documented action trigger. If a metric is present but has no action trigger, it does not belong on the scorecard.

---

## 2. Business Use Case

Managed data and analytics functions operate across concurrent workstreams: production support, engineering requests, platform operations, and strategic modernization. Without a unified operating view, service owners lose signal in the noise of ticket queues, ad hoc requests, and stakeholder escalations.

The scorecard consolidates the leading and lagging indicators that determine whether the function is:

- Delivering against committed service levels
- Managing incident risk before it escalates to executive attention
- Spending within budget and operating within capacity headroom
- Maintaining data product quality across the portfolio
- Making measurable progress on platform modernization
- Keeping backlog health and delivery throughput in balance

This document describes the scorecard structure as a reference operating model. The interactive implementation is in [`src/data/operations.js`](../../src/data/operations.js) and rendered across the five dashboard tabs in [`src/App.jsx`](../../src/App.jsx).

---

## 3. Users and Stakeholders

| Role | Relationship to Scorecard |
|------|--------------------------|
| D&A Service Owner | Primary operator. Reviews the full scorecard weekly. Owns all metric targets and threshold definitions. |
| Delivery Lead / Ops Manager | Reviews incident, backlog, and throughput sections daily. Triages capacity and demand signals. |
| Platform Engineering Lead | Owns modernization section. Reviews debt reduction and automation coverage monthly. |
| Data Product Manager | Reviews portfolio health, data quality score, and adoption signals. |
| Finance Business Partner | Reviews cost and variance sections in monthly budget cycle. |
| Executive Sponsor | Receives scorecard summary in monthly operating review. Not a primary user of the full view. |

---

## 4. Operating Model

The scorecard operates on a tiered review cadence aligned to metric volatility:

| Tier | Cadence | Metrics Reviewed | Reviewer |
|------|---------|-----------------|---------- |
| Daily | Operational | P1/P2 open incidents, MTTR, critical backlog items | Ops manager, on-call lead |
| Weekly | Operational | Full incident funnel, backlog age, throughput, SLA vs target, capacity utilization | Service owner, delivery lead |
| Monthly | Management | SLA trend, budget variance, run rate, FTE utilization, data quality, modernization progress | Service owner, finance, platform lead |
| Quarterly | Executive | Portfolio health summary, tech debt reduction, automation coverage, capacity plan vs actuals | Service owner, executive sponsor |

Metric targets are set during quarterly planning. Mid-quarter adjustments require service owner sign-off and must be noted in the scorecard version history.

---

## 5. Architecture

### Dashboard Implementation (Implemented)

The interactive dashboard is a Vite 5 / React 18 single-page application deployed to Cloudflare Pages via GitHub Actions CI/CD.

```
src/
  App.jsx                    # Tab shell, navigation, header
  components/
    ServiceHealth.jsx         # SLA attainment, 12-month trend, SLA by service area
    IncidentFunnel.jsx        # Severity distribution, category breakdown, resolution trend
    DemandBacklog.jsx         # Backlog by work type, top items, throughput metrics
    CostCapacity.jsx          # Cost breakdown, geo capacity, 6-month cost trend
    Modernization.jsx         # Roadmap tracker, tech debt reduction, automation coverage
  data/
    operations.js            # Simulated sample data — see Data Classification below
```

All data displayed in the dashboard is synthetic sample data defined in `src/data/operations.js`. It is representative of the shape and relationships of real operational data. No production data source, live API, or real incident history is connected.

### Scorecard Reference Architecture (Designed)

In a production implementation, the scorecard data layer would be separated from the presentation layer:

```
[Source systems]
  ITSM / ticketing (ServiceNow, Jira Service Management)
  BI platform APIs (Power BI REST API, Tableau REST API)
  Cloud cost management (Azure Cost Management, Snowflake cost queries)
  Pipeline monitoring (Databricks job metrics, ADF run history)
  Data quality platform (Great Expectations, dbt test results)
      ↓
[Data aggregation]
  Scheduled pipeline (daily/hourly refresh)
  Operational data store (dedicated schema, not production replica)
      ↓
[Scorecard presentation layer]
  Dashboard (this application)
  Weekly email digest
  Executive slide export
```

This architecture is a reference design. It is not deployed in this repository.

---

## 6. Controls

### Metric Definitions and Targets

> **Sample data note:** The values below are representative targets based on common managed services operating models. The simulated data in `operations.js` is structured to demonstrate movement relative to these thresholds. These are not attainment claims.

#### Service Reliability Controls

| Metric | Definition | Target | Alert Threshold | Sample Value in App |
|--------|-----------|--------|----------------|---------------------|
| SLA Attainment | Percentage of service commitments met within defined SLA windows, measured monthly | ≥ 99.0% | < 99.0% | 99.4% |
| P1/P2 Incidents MTD | Count of Priority 1 and Priority 2 incidents opened in the current calendar month | ≤ 5 | > 5 triggers ops review | 3 |
| MTTR | Mean time from incident detection to service restoration, measured across all severities | ≤ 4.0h | > 4.0h triggers process review | 1.8h |
| Data Quality Score | Percentage of data pipeline outputs passing defined quality checks | ≥ 97.0% | < 97.0% requires immediate DQ review | 96.1% |

#### Incident Controls

| Metric | Definition | Target | Alert Threshold |
|--------|-----------|--------|----------------|
| Repeat Incident Rate | Count of incidents with same root cause as a prior incident in the rolling 90-day window | ≤ 3 per month | > 3 triggers root cause governance review |
| RCA Completion Rate | Percentage of P1/P2 incidents with completed root cause analysis within SLA window | ≥ 90% | < 90% escalates to service owner |
| Incident Volume Trend | Month-over-month change in total incident count | Declining or stable | > 10% increase triggers capacity and process audit |

#### Demand and Delivery Controls

| Metric | Definition | Target | Alert Threshold |
|--------|-----------|--------|----------------|
| Open Backlog Items | Total count of items in active backlog not yet in delivery | ≤ 30 | > 40 triggers demand review with stakeholders |
| Avg Backlog Age | Average calendar days from item creation to current date, across open items | ≤ 14 days | > 21 days triggers prioritization session |
| Delivery Throughput | Items completed per week, rolling 4-week average | ≥ 7.0/wk | < 5.0/wk triggers capacity or process investigation |
| Capacity Utilization | Team capacity consumed as percentage of available FTE hours | 75–90% | > 90% triggers headcount or demand negotiation |

#### Cost and Capacity Controls

| Metric | Definition | Target | Alert Threshold |
|--------|-----------|--------|----------------|
| Monthly Run Rate | Total cost of service delivery including platform, team, tooling, and vendor spend | Within ±5% of budget | > +5% variance triggers finance review |
| Budget Variance | Actual vs. budgeted monthly spend as a percentage | Within ±5% | > +5% escalates to finance business partner |
| FTE Utilization | Billable or allocated hours as percentage of available capacity by geography | 75–90% | > 90% in any geo triggers geo-specific review |

#### Modernization Controls

| Metric | Definition | Target | Alert Threshold |
|--------|-----------|--------|----------------|
| Active Initiatives | Count of modernization initiatives in progress | ≥ 1, ≤ 8 | > 8 triggers initiative portfolio review |
| Tech Debt Retired (QTD) | Count of tech debt items closed this quarter | ≥ 5 per quarter | Decline vs. prior quarter triggers engineering review |
| Automation Coverage | Percentage of repeatable operational tasks covered by automation or runbooks | ≥ 65% | < 60% triggers automation backlog reprioritization |
| Runbook Compliance | Percentage of recurring operational tasks with a documented and current runbook | ≥ 90% | < 85% triggers knowledge management review |

---

## 7. Workflow

### Weekly Scorecard Review Workflow

```
Monday
  ↓
Ops manager pulls incident funnel and backlog snapshot
  ↓
Red/yellow metrics flagged, owners notified
  ↓
Wednesday
  ↓
Service owner reviews full scorecard
  ↓
Decision: Escalate to executive? Reprioritize demand? Engage finance?
  ↓
Actions logged with owner and due date
  ↓
Friday
  ↓
Open actions reviewed for completion
  ↓
Scorecard snapshot saved to operating log
```

### Escalation Triggers

| Condition | Escalation Path |
|-----------|----------------|
| P1 incident open > 4 hours | Service owner notified; executive sponsor briefed if business impact confirmed |
| SLA attainment drops below 99.0% | Executive operating review agenda item; remediation plan required within 48h |
| Budget variance exceeds +5% | Finance business partner engaged; spend freeze on discretionary items |
| Capacity utilization > 90% in any geo | Demand negotiation with stakeholders; hiring or contractor request initiated |
| Modernization initiative stalled > 30 days | Portfolio review; de-scope or resource reallocation decision |

---

## 8. Operational Metrics

### Scorecard Dimensions and Metric Mapping

The following table maps scorecard dimensions to the dashboard tabs implemented in this repository:

| Scorecard Dimension | Dashboard Tab | Metrics Rendered | Data in App |
|--------------------|--------------|-----------------|-------------|
| Service reliability | Service Health | SLA attainment, P1/P2 MTD, MTTR, data quality | Simulated sample |
| Incident management | Incident Funnel | Volume, severity split, category breakdown, resolution trend, RCA rate | Simulated sample |
| Demand and delivery | Demand & Backlog | Open items, avg age, throughput, utilization, backlog by type | Simulated sample |
| Cost and capacity | Cost & Capacity | Run rate, budget variance, cost breakdown, geo utilization, cost trend | Simulated sample |
| Platform modernization | Modernization | Active initiatives, roadmap progress, tech debt retirement, automation coverage | Simulated sample |
| Portfolio health | Reference architecture | See `PORTFOLIO_HEALTH_METRICS.md` | Not yet rendered |
| Executive cadence | Reference architecture | See `EXECUTIVE_REVIEW_CADENCE.md` | Not yet rendered |

---

## 9. Workplace Application

The scorecard model described here applies directly to any managed data and analytics function operating with:

- A defined set of service commitments (SLAs or OLAs)
- A mixed delivery model (incidents, requests, engineering, modernization)
- A multi-tier stakeholder set from operational to executive
- A need to demonstrate service value, manage costs, and control risk

Specific operational contexts where this scorecard structure applies:

- **Managed services delivery:** Tracking service health for a client-facing analytics function
- **Internal shared services:** Governing a central D&A platform serving multiple business units
- **Platform modernization programs:** Managing the balance between run-the-business and change-the-business workload
- **Cost center governance:** Demonstrating cost efficiency and budget discipline to finance stakeholders

The scorecard is designed to be portable across SAP, Microsoft, Databricks, Snowflake, and cloud-agnostic environments. Tool names in the backlog (Power BI, ADF, Databricks, Snowflake, SAP BW) reflect common enterprise D&A stack components and are representative, not client-specific.

---

## 10. Limitations

- All metric values in the dashboard are synthetic sample data. They are not derived from a production data source, live ITSM system, or real incident history.
- The dashboard does not implement server-side data refresh, authentication, role-based access control, or alerting. These are reference architecture components.
- Metric targets in this document represent common industry operating model thresholds. They are not derived from a specific client SLA or contractual commitment.
- The scorecard does not include user adoption metrics, self-service consumption rates, or business impact quantification. These require integration with product analytics tools not present in this repository.
- No cost figures should be interpreted as real budget data. The cost breakdown in the app uses round sample values for structural illustration only.

---

## 11. What This Does Not Claim

- This scorecard is not deployed in a production operations environment.
- No SLA attainment figures represent real attainment against a client or internal commitment.
- No incident volumes, MTTR values, or RCA rates are drawn from a real ITSM system.
- No cost values represent real billing or budget data from any organization.
- No modernization progress percentages reflect actual program status.
- This repository does not constitute evidence of production deployment, live service ownership, or client delivery outcomes.

---

## 12. Extension Path

| Extension | Effort | Prerequisites |
|-----------|--------|--------------|
| Connect a live ITSM data source (ServiceNow, Jira SM) | Medium | Backend API layer, authentication, data pipeline |
| Add real-time SLA calculation from pipeline monitoring events | High | Event stream integration (Kafka, EventHub), time-series store |
| Implement role-based access (exec view vs. ops view) | Medium | Auth layer (OAuth, SSO), view-level data filtering |
| Export scorecard as PDF or scheduled email digest | Low | Server-side rendering or print stylesheet |
| Add trend anomaly detection and automated alerting | High | ML inference pipeline, alerting integration (PagerDuty, Teams) |
| Integrate data quality results from dbt tests or Great Expectations | Medium | CI/CD hook into quality platform results API |
| Add portfolio-level metric rollup across multiple service lines | Medium | Multi-tenant data model, service catalog integration |

---

## 13. Interview Talking Points

**On scorecard design:**
A scorecard without action triggers is just a reporting page. Every metric here has a threshold and a defined next step — that's what separates operational governance from dashboard theater.

**On data classification:**
The dashboard renders simulated data explicitly labeled as sample data. The structural pattern — metric cards, trend charts, backlog tables, geo capacity bars — reflects how a real scorecard would be organized. The gap between the current app and a production scorecard is a data integration problem, not a design problem.

**On metric selection:**
The choice to include data quality score alongside SLA attainment is deliberate. SLA measures whether the pipeline ran on time. Data quality measures whether what arrived was trustworthy. Both are required for a complete service health picture.

**On scorecard governance:**
Targets have to be set in planning, reviewed quarterly, and not silently changed when performance dips. The version control and action log workflow in Section 7 is how you prevent scorecard drift.

**On the modernization dimension:**
Modernization tracking belongs on the ops scorecard because tech debt and automation gaps are lagging risk indicators for future incident volume. If the modernization section is green, the incident section is likely to stay green. If it's red, you're accumulating future operational risk.
