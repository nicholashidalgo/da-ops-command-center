# Portfolio Health Metrics

**Status:** Designed — metric framework and calculation definitions are reference operating model; dashboard renders simulated sample data for structural illustration

---

## 1. Purpose

Portfolio health metrics provide an aggregate view of data product performance, analytics delivery capacity, reporting platform reliability, and operational workload distribution. They answer the question a data product leader or D&A service owner asks at the start of every planning cycle: *is the portfolio healthy enough to absorb new demand, and are the right products getting the right level of investment?*

Individual scorecards show whether a single service is meeting its SLA. Portfolio health metrics show whether the entire collection of data products and services is in a sustainable operating posture.

---

## 2. Business Use Case

Data and analytics functions typically support a heterogeneous portfolio — legacy reporting platforms, actively developed data products, self-service analytics tools, data pipelines at various maturity levels, and modernization initiatives running in parallel. Without portfolio-level visibility, service owners operate with a fragmented picture: they know the individual status of each service but cannot see cross-portfolio patterns like:

- Which products are generating disproportionate incident load
- Whether delivery capacity is concentrated in one area while other services atrophy
- How tech debt is distributed across the portfolio
- Whether adoption is growing, stagnating, or declining by product type
- Which dependencies are shared across multiple products and represent systemic risk

Portfolio health metrics aggregate individual service metrics into a cross-cutting view that supports capacity allocation decisions, modernization prioritization, and executive communication.

---

## 3. Users and Stakeholders

| Role | Use |
|------|-----|
| D&A Service Owner | Quarterly portfolio review, capacity allocation decisions, modernization prioritization |
| Data Product Manager | Product-level health tracking, user adoption trends, backlog balance |
| Delivery Lead | Workload distribution analysis, throughput by product area, capacity planning |
| Architecture Lead | Dependency risk assessment, tech debt distribution, platform maturity mapping |
| Finance Business Partner | Cost per product area, portfolio-level budget variance, build vs. buy decisions |
| Executive Sponsor | Portfolio risk summary, modernization progress, business value realization |

---

## 4. Operating Model

Portfolio health metrics are reviewed on a longer cadence than operational metrics. They are not incident-frequency indicators; they are trend and investment indicators.

| Review Level | Cadence | Scope | Owner |
|-------------|---------|-------|-------|
| Product-level | Monthly | Incident rate, adoption, backlog, quality by product | Data Product Manager |
| Portfolio-level | Quarterly | Cross-product patterns, capacity distribution, debt load | D&A Service Owner |
| Executive summary | Quarterly | Risk posture, investment allocation, modernization status | Service Owner → Exec |

The portfolio review is a structured meeting, not a standing agenda item. It requires preparation: metric snapshots pulled before the meeting, anomalies flagged in advance, and decisions scoped to specific action items with owners.

---

## 5. Architecture

### Reference Data Model (Designed)

A portfolio health data model requires a service catalog as its foundation. Without a defined catalog of products and services, there is no stable unit of aggregation.

```
[Service Catalog]
  product_id, product_name, product_type, owner, tier, platform, status
      ↓
[Operational Data]
  incidents by product_id
  backlog items by product_id
  pipeline run results by product_id
  data quality results by product_id
  cost allocation by product_id (if available)
      ↓
[Aggregation Layer]
  Portfolio health mart (daily refresh)
      ↓
[Portfolio Dashboard]
  Cross-product heatmap
  Portfolio health scorecard
  Adoption trends by product type
  Debt and risk distribution
```

### Current Implementation

This repository does not implement a service catalog or portfolio-level data aggregation. The five dashboard tabs in [`src/App.jsx`](../../src/App.jsx) present metrics at the aggregate service-level — not broken down by individual data product.

The closest approximation in the current app is the service-area breakdown in the Service Health tab ([`src/components/ServiceHealth.jsx`](../../src/components/ServiceHealth.jsx)), which shows SLA attainment by service category (data pipelines, reporting/BI, platform monitoring, visualization, data engineering requests). This is a structural pattern consistent with portfolio-level reporting but operates at a higher level of aggregation than individual product tracking.

---

## 6. Controls

### Portfolio Health Metric Definitions

> **Data note:** All metric examples in this section are reference definitions. Calculated values shown in the dashboard use simulated sample data from `src/data/operations.js`. No values represent real portfolio performance.

#### Data Product Metrics

| Metric | Definition | Calculation | Owner | Review Cadence | Action Trigger |
|--------|-----------|------------|-------|----------------|----------------|
| Product SLA Attainment | Percentage of delivery commitments met for a given data product, within defined SLA window | (Delivered on time / Total committed) × 100, measured monthly | Data Product Manager | Monthly | < 99.0% triggers product-level remediation plan |
| Product Incident Rate | Count of incidents attributable to a specific product in rolling 30 days | Direct count from ITSM, filtered by product_id | Data Product Manager | Monthly | > 3 incidents in 30 days triggers stability review |
| Data Quality Pass Rate | Percentage of data quality checks (schema, completeness, freshness, referential integrity) passing for a product's outputs | (Passed checks / Total checks) × 100 | Data Engineering Lead | Weekly | < 95% triggers quality remediation sprint |
| Product Adoption Trend | Month-over-month change in active consumers (users, downstream processes, API calls) | Current month active consumers vs. prior month, by product | Data Product Manager | Monthly | Declining for 2+ consecutive months triggers product review |
| Backlog Age by Product | Average age of open backlog items scoped to a product | Sum of open item ages / count of open items, by product_id | Delivery Lead | Weekly | > 21 days average triggers demand review |

#### Reporting Platform Metrics

| Metric | Definition | Calculation | Owner | Review Cadence | Action Trigger |
|--------|-----------|------------|-------|----------------|----------------|
| Report Availability | Percentage of time a reporting platform or published report is accessible to end users | Uptime minutes / Total minutes × 100 | Platform Operations | Daily (automated) | < 99.5% triggers platform incident |
| Report Refresh SLA | Percentage of scheduled report refreshes completing within the defined SLA window | (On-time refreshes / Scheduled refreshes) × 100 | Platform Operations | Daily (automated) | < 98.0% triggers pipeline review |
| Self-Service Adoption Rate | Active users of self-service analytics tools as percentage of licensed seats | Monthly active users / Total licensed users × 100 | Data Product Manager | Monthly | < 40% triggers enablement or product review |
| Report Error Rate | Percentage of report loads or refreshes resulting in an error | (Error events / Total load events) × 100 | Platform Operations | Weekly | > 2% triggers platform investigation |

#### Analytics Delivery Metrics

| Metric | Definition | Calculation | Owner | Review Cadence | Action Trigger |
|--------|-----------|------------|-------|----------------|----------------|
| Delivery Throughput (Portfolio) | Total items completed across all product areas per week, rolling 4-week average | Sum of closed items across all product queues / 4 | Delivery Lead | Weekly | < 6/wk total triggers capacity or process review |
| Request-to-Delivery Cycle Time | Median calendar days from request submission to delivery acceptance | Median of (close_date − create_date) for closed items, by type | Delivery Lead | Monthly | > 21 days median triggers process improvement |
| Rework Rate | Percentage of delivered items requiring rework due to quality or scope issues | (Items requiring rework / Total delivered) × 100 | Delivery Lead | Monthly | > 10% triggers requirements and QA review |
| Demand Mix | Distribution of backlog by work type (incident response, enhancements, modernization, ad hoc) | Count by type / Total open items × 100 | Service Owner | Monthly | Ad hoc > 30% of backlog triggers demand governance |

#### Operational Workload Metrics

| Metric | Definition | Calculation | Owner | Review Cadence | Action Trigger |
|--------|-----------|------------|-------|----------------|----------------|
| Run-vs-Change Ratio | Ratio of capacity spent on run-the-business (incidents + support) vs. change-the-business (enhancements + modernization) | Run items closed / (Run + Change items closed) × 100 | Service Owner | Monthly | Run > 60% for 2+ months triggers modernization acceleration |
| Dependency Exposure Index | Count of data products sharing a common pipeline, platform, or dependency, weighted by criticality | Count of products per shared dependency, prioritized by tier | Architecture Lead | Quarterly | Single dependency serving > 3 tier-1 products triggers resilience review |
| Platform Maturity Distribution | Distribution of data products by technology lifecycle stage (legacy, current, next-gen) | Count by technology lifecycle classification | Architecture Lead | Quarterly | > 30% of portfolio in legacy classification triggers modernization planning |
| Tech Debt Load | Count of open tech debt items attributable to the portfolio, by product area | Direct count from debt tracking, by product_id or service area | Platform Engineering | Quarterly | Increasing QoQ triggers engineering investment review |

---

## 7. Workflow

### Monthly Product Health Review

```
Input: metric snapshots (incident counts, adoption, quality, backlog) by product

Step 1: Flag products with any metric breaching threshold
Step 2: Classify each flagged product by severity (red / yellow)
Step 3: Identify cross-product patterns (shared dependencies, platform-level issues)
Step 4: Review demand mix — is run consuming too much of the portfolio capacity?
Step 5: Review adoption trends — are products being used or accumulating without users?
Step 6: Assign remediation owners and due dates
Step 7: Log actions in operating record

Output: Updated portfolio health view, action register, escalation list for quarterly review
```

### Quarterly Portfolio Review

```
Input: Three months of product health snapshots, cost actuals, modernization status

Agenda:
  1. Portfolio health heatmap — which products are red/yellow/green across all dimensions?
  2. Capacity distribution — is effort aligned with product tier and business value?
  3. Tech debt review — which products are accumulating debt fastest?
  4. Modernization progress — are legacy products moving toward current-gen classification?
  5. Dependency risk — which shared components represent the highest portfolio risk?
  6. Investment decisions — rebalance, retire, or accelerate which products?

Output: Portfolio investment decision, updated roadmap priorities, executive summary
```

---

## 8. Operational Metrics

### Dashboard-to-Portfolio Metric Mapping

The current dashboard renders aggregate-level metrics. The table below maps what is rendered in the app to the portfolio metric framework described above.

> **Sample data note:** All values in the "Sample value in app" column are from simulated data in `src/data/operations.js`. They are not real portfolio attainment figures.

| Portfolio Metric | Closest App Equivalent | App Tab | Sample Value | Gap |
|-----------------|----------------------|---------|--------------|-----|
| Portfolio SLA Attainment | SLA attainment (aggregate) | Service Health | 99.4% | App shows aggregate; portfolio view requires per-product breakdown |
| SLA by service area | SLA by service area | Service Health | 98.7–99.8% | Service areas, not individual products |
| Incident rate by product | Incident category breakdown | Incident Funnel | 7 pipeline, 4 DQ, 3 platform | Category only; no product-level attribution |
| Delivery throughput | Throughput metric | Demand & Backlog | 8.2/wk | Aggregate; no per-product view |
| Demand mix | Backlog by work type | Demand & Backlog | 8 incident, 14 enhancement, 7 modern, 5 ad hoc | Aggregate counts; percentages not displayed |
| Capacity utilization | Capacity by geography | Cost & Capacity | 78–92% by geo | Geo-level; not by product area |
| Tech debt load | Tech debt trend | Modernization | 22 open items Q4 FY25 | Aggregate; not attributed to specific products |
| Platform maturity | Modernization roadmap | Modernization | 2 done, 3 in progress, 1 planned | Initiative-level; no portfolio-wide classification |
| Adoption trends | Not implemented | — | — | Requires consumption data integration |
| Dependency exposure | Not implemented | — | — | Requires service catalog and dependency mapping |

---

## 9. Workplace Application

Portfolio health metrics apply to any data organization managing more than a handful of discrete data products or service lines. The framework is especially useful in:

- **Multi-product analytics platforms:** When a single D&A function supports finance, HR, operations, and commercial analytics simultaneously, portfolio metrics provide a cross-functional view that individual product owners cannot see.
- **Managed services transitions:** When a function is moving from project-based delivery to product-based delivery, portfolio metrics provide the accountability structure.
- **Technology migration programs:** When a portfolio includes both legacy systems and next-gen platforms, the maturity distribution and tech debt metrics make the risk visible and the modernization case concrete.
- **Capacity constrained environments:** When total team capacity is fixed, portfolio metrics expose where capacity is being consumed and support prioritization decisions with data rather than stakeholder pressure.

The metric definitions in this document are tool-agnostic. They apply equally to portfolios built on SAP, Microsoft, Databricks, Snowflake, or open-source platforms.

---

## 10. Limitations

- Portfolio metrics require a service catalog as their foundational data structure. Without a catalog, there is no stable unit of aggregation. This document defines the metric framework; the catalog is an upstream dependency not included here.
- Adoption metrics require integration with platform usage logs or product analytics instrumentation. Neither is implemented in this repository.
- Dependency exposure indexing requires a defined dependency map, which is typically maintained in an architecture repository or configuration management database (CMDB). This is referenced but not implemented.
- Cost allocation at the product level requires cost tagging in cloud platforms and either a chargeback model or a cost allocation methodology. These are organizational and financial decisions outside the scope of a dashboard implementation.
- The metrics in this document use simplified calculation formulas. Production implementations may require adjustment for seasonality, contract specifics, and organizational measurement conventions.

---

## 11. What This Does Not Claim

- This document does not claim a production portfolio health system is implemented.
- No adoption trend data represents real user consumption figures.
- No cost-per-product figures represent real chargeback or allocation data.
- No dependency exposure scores represent a real architectural risk assessment.
- No tech debt counts represent a real backlog from a production delivery organization.
- This repository does not include a service catalog, CMDB integration, or product analytics instrumentation.

---

## 12. Extension Path

| Extension | Effort | Prerequisites |
|-----------|--------|--------------|
| Add service catalog data model to the app | Low | Static JSON catalog file; no external dependency |
| Render per-product metric breakdowns from catalog | Medium | Catalog data model, component refactor |
| Integrate Power BI REST API for report adoption metrics | Medium | Azure AD app registration, Power BI admin API access |
| Add dependency graph visualization | Medium | Graph data structure, D3 or React Flow rendering |
| Implement cost allocation by product from cloud cost export | High | Cloud cost tagging, allocation model, data pipeline |
| Add platform maturity classification heatmap | Low | Catalog enhancement, heatmap component |
| Automate quarterly portfolio review report generation | Medium | Server-side rendering, PDF export, scheduling |

---

## 13. Interview Talking Points

**On portfolio vs. product metrics:**
Individual product metrics tell you whether a specific thing is working. Portfolio metrics tell you whether your investment and capacity allocation is rational. A healthy portfolio is not one where every product is green — it's one where capacity is aligned to business value, tech debt is being managed, and modernization is making progress without starving operations.

**On the service catalog dependency:**
The most common failure mode in portfolio health reporting is the missing service catalog. Teams build dashboards before they define what they're measuring. The catalog is not a technology problem — it's a governance decision about what constitutes a "product" and who owns it.

**On adoption metrics:**
Adoption is the canary metric for product health. A data product with a 99.9% SLA and zero users is not a healthy product — it's a liability. Adoption tracking belongs on the portfolio health scorecard.

**On the run-vs-change ratio:**
If a D&A function is spending more than 60% of its capacity on incident response and maintenance, it has structurally insufficient room for modernization and improvement. That ratio is one of the most important signals for whether a function is in a sustainable or deteriorating operating posture.

**On dependency exposure:**
Shared dependencies in data platforms — a single Snowflake warehouse, a critical SAP extractor, a central ADF pipeline — are portfolio-level risk concentrations. When that dependency fails, multiple products fail simultaneously. The dependency exposure index is how you make that risk visible before the failure happens.
