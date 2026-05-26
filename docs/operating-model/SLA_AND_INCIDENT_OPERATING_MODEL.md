# SLA and Incident Operating Model

**Status:** Designed — incident lifecycle and SLA framework are reference operating model; dashboard renders simulated sample data for structural illustration

---

## 1. Purpose

This document defines the operating model for service-level agreement (SLA) governance and incident management in a managed data and analytics function. It covers how service commitments are defined and measured, how incidents are detected, triaged, escalated, resolved, and reviewed, and how the two processes connect — because every SLA breach is an incident, and every significant incident is a potential SLA breach.

The incident operating model described here is a reference design. The interactive dashboard in this repository ([`src/components/IncidentFunnel.jsx`](../../src/components/IncidentFunnel.jsx)) visualizes the output of this model using simulated sample data. It is not connected to a live incident management system.

---

## 2. Business Use Case

Data and analytics functions that operate without a structured incident model accumulate risk invisibly. Incidents get resolved informally, root causes go undocumented, repeat failures occur because the first resolution was symptomatic rather than causal, and stakeholders lose confidence because they never receive a structured communication about what happened and what changed.

A structured SLA and incident operating model provides:

- **Predictability:** Stakeholders know what service levels to expect and how incidents affecting those levels are handled.
- **Accountability:** Every incident has an owner, a severity, and a resolution timeline. Ownership does not shift without a documented handoff.
- **Institutional memory:** Root cause documentation accumulates into a searchable record. Repeat incident analysis becomes possible.
- **Improvement signal:** MTTR trends, repeat incident rates, and RCA completion rates measure whether the function is getting better or worse at managing failures.
- **Executive communication:** Incident summaries and SLA attainment reports provide the factual basis for stakeholder communication without requiring executive participation in operational triage.

---

## 3. Users and Stakeholders

| Role | Responsibilities |
|------|----------------|
| On-Call Lead / Incident Commander | Receives initial alert, performs first triage, assigns severity, coordinates resolution |
| Delivery Lead / Ops Manager | Monitors incident queue, escalates to service owner when thresholds are breached, reviews daily |
| Service Owner | Final escalation point for P1/P2 incidents. Reviews weekly incident funnel. Owns SLA definitions. |
| Platform / Data Engineering Team | Performs root cause analysis, implements fixes, documents resolution and prevention |
| Stakeholder (service consumer) | Receives incident communications at defined intervals during active incidents |
| Executive Sponsor | Receives incident summary for P1 events. Reviews SLA attainment monthly. |

---

## 4. Operating Model

### SLA Definitions

Service-level agreements define the performance commitments made to service consumers. In a managed D&A function, SLAs are defined per service area and per incident severity.

#### Service Area SLA Targets

> **Reference values:** The service areas below reflect the structure in [`src/data/operations.js`](../../src/data/operations.js). Targets are representative of common managed services commitments. The simulated SLA values in the app (98.7–99.8%) are sample data, not real attainment figures.

| Service Area | SLA Target | Measurement Window | Breach Definition |
|-------------|-----------|-------------------|------------------|
| Data pipelines | ≥ 99.5% | Monthly | Pipeline failure or late completion exceeding defined tolerance |
| Reporting / BI | ≥ 99.0% | Monthly | Report unavailability or refresh failure exceeding SLA window |
| Platform monitoring | ≥ 99.0% | Monthly | Monitoring gap or alert failure resulting in undetected incident |
| Visualization | ≥ 98.5% | Monthly | Dashboard unavailability or data staleness exceeding defined threshold |
| Data engineering requests | ≥ 99.0% | Monthly | Delivery commitment missed beyond agreed grace period |

#### Incident Response SLAs

| Severity | Definition | Initial Response | Status Update | Resolution Target | Escalation |
|----------|-----------|-----------------|--------------|------------------|-----------|
| P1 — Critical | Business-critical service or data product is completely unavailable or producing materially incorrect data with confirmed business impact | 15 minutes | Every 30 minutes | 4 hours | Immediate: service owner, executive sponsor |
| P2 — High | Major functionality impaired, workaround not available, significant user impact | 30 minutes | Every 2 hours | 8 hours | 2 hours: service owner |
| P3 — Medium | Service degraded, workaround available, moderate user impact | 2 hours | At resolution | 3 business days | Daily: delivery lead |
| P4 — Low | Minor issue, no business impact, cosmetic or informational | 1 business day | At resolution | 7 business days | None unless aging |

---

## 5. Architecture

### Incident Lifecycle Overview

```
Detection
  ↓
Triage and Severity Assignment
  ↓
Incident Commander Assignment
  ↓
Active Resolution (with defined communication cadence)
  ↓
Resolution and Service Restoration
  ↓
Post-Incident Review (P1/P2 required; P3 optional)
  ↓
Root Cause Documentation
  ↓
Prevention Implementation
  ↓
Incident Record Closed
```

### Tooling Reference Architecture (Designed)

The following architecture describes how an integrated incident management system would connect to the operational dashboard. This is not implemented in this repository.

```
[Detection Layer]
  Pipeline monitoring (Databricks job alerts, ADF pipeline failure notifications)
  BI platform health monitoring (Power BI service health API, Tableau Server alerts)
  Data quality platform (dbt test failures, Great Expectations validations)
  Infrastructure monitoring (cloud platform alerts, custom Datadog/Azure Monitor rules)
      ↓
[Triage Layer]
  ITSM (ServiceNow, Jira Service Management)
  On-call rotation (PagerDuty, OpsGenie)
  Incident commander assignment
      ↓
[Communication Layer]
  Stakeholder notification (Teams, Slack, email templates)
  Status page updates
  Executive briefing (P1 events)
      ↓
[Resolution Layer]
  Incident war room (Teams/Slack channel per incident)
  Runbook execution
  Fix deployment
      ↓
[Review Layer]
  Post-incident review meeting
  RCA documentation
  Prevention backlog item creation
      ↓
[Aggregation Layer]
  Incident metrics pipeline
  MTTR, volume, RCA rate, repeat rate calculations
      ↓
[Dashboard]
  Incident Funnel tab (this application)
```

---

## 6. Controls

### Detection Controls

| Control | Description | Implementation Status |
|---------|------------|----------------------|
| Pipeline failure alerting | Automated alerts on pipeline run failure or late completion | Reference architecture |
| Data freshness monitoring | Checks that dataset timestamps are within defined freshness SLA | Reference architecture |
| BI platform health polling | Periodic health checks on reporting platform availability and refresh status | Reference architecture |
| Anomaly-based alerting | Statistical anomaly detection on key metric trends (volume, latency, error rate) | Future extension |
| Runbook-linked alert templates | Alert notifications include direct link to relevant runbook | Reference architecture |

### Triage Controls

| Control | Description |
|---------|------------|
| Severity matrix | Documented matrix for assigning P1–P4 based on impact, scope, and workaround availability |
| Incident commander accountability | Every active P1/P2 has a named commander; commander cannot be changed without a logged handoff |
| 15-minute P1 acknowledgment SLA | Unacknowledged P1 alerts auto-escalate to backup on-call and delivery lead |
| Duplicate detection | New incidents screened against open incidents before creation to prevent duplicate tracking |
| Service area tagging | Every incident tagged to a service area for portfolio-level aggregation |

### Resolution Controls

| Control | Description |
|---------|------------|
| Runbook coverage requirement | P1/P2 incident types require an existing runbook or runbook creation as a post-resolution action |
| Fix validation requirement | Resolution is not declared until fix is validated by a party other than the person who applied it |
| Communication close-out | Stakeholder notification required at resolution; not implicit in ticket closure |
| MTTR measurement | Clock starts at detection time (alert fired or ticket opened), not at assignment time |

### Post-Incident Controls

| Control | Description | P1/P2 Required | P3 |
|---------|------------|---------------|-----|
| Post-incident review meeting | Structured review with all resolvers and relevant stakeholders | Yes, within 48h of resolution | Optional |
| RCA documentation | Written root cause analysis covering detection gap, contributing factors, fix applied, and prevention actions | Yes | Optional |
| Prevention backlog item | At least one actionable prevention item created and assigned from each P1/P2 RCA | Yes | Optional |
| Repeat incident check | Compare RCA against prior incidents for same service area to identify repeat patterns | Yes | Yes |
| RCA rate tracking | Percentage of P1/P2 incidents with completed RCA, reported in weekly review | Target: ≥ 90% | — |

---

## 7. Workflow

### P1 Incident Workflow

```
T+0: Alert fires or user report received
  → On-call lead acknowledges within 15 minutes
  → Incident ticket created; severity set to P1

T+15: Initial triage
  → Confirm blast radius and business impact
  → Identify service area and assign to resolving team
  → Open war room channel
  → Notify service owner and stakeholders via defined template

T+30: First status update
  → Update ticket and stakeholder channel: current state, actions in progress, next update ETA

T+60 (ongoing): 30-minute status updates until resolution
  → Each update includes: current state, actions taken, remaining unknowns, next steps

T+Resolution: Service restoration
  → Confirm fix validated by second party
  → Notify stakeholders: service restored, interim summary
  → Set ticket to resolved (not closed — post-incident review required)

T+48h: Post-incident review
  → Attendees: incident commander, resolvers, service owner, affected stakeholders
  → Document: detection gap, timeline, contributing factors, fix, prevention actions
  → Create prevention backlog items

T+72h: RCA document published
  → Distributed to service owner and stakeholders
  → Appended to incident record
```

### P2 Incident Workflow

```
T+0: Alert or report received
  → Acknowledged within 30 minutes
  → Severity confirmed as P2; owner assigned

T+2h: Escalation check
  → If no progress toward resolution, escalate to service owner

T+8h: Resolution target
  → If not resolved, P2 promoted to P1 review

T+Resolution: Stakeholder communication and ticket update

T+5 business days: Post-incident review (required if MTTR > 4h or repeat incident)
```

### SLA Breach Workflow

```
Detection: SLA attainment drops below target for a service area (monthly calculation)
  ↓
Service owner notified within 24 hours of calculation
  ↓
Service owner determines whether breach is:
  (a) Data error — recalculate and document
  (b) Genuine breach — proceed to remediation

Remediation:
  → Identify contributing incidents in the measurement period
  → Review whether incidents had completed RCAs and prevention items
  → Create SLA remediation plan: specific actions, owner, timeline
  → Notify stakeholder (service consumer) of breach and remediation plan within 48h

Quarterly review:
  → SLA trend reviewed in executive operating review
  → Persistent underperformance (3+ months below target) triggers formal SLA renegotiation or service redesign
```

---

## 8. Operational Metrics

The following metrics are tracked in the Incident Funnel tab of the dashboard and are described here with their operational definitions.

> **Sample data note:** All values are simulated sample data from `src/data/operations.js`. They are not drawn from a real incident management system.

| Metric | Definition | App View | Sample Value | Target |
|--------|-----------|---------|--------------|--------|
| Total incidents MTD | Count of all incidents opened in the current calendar month | Metric card, Incident Funnel | 18 | Declining trend |
| P1/P2 incidents MTD | Count of Priority 1 and Priority 2 incidents opened MTD | Metric card, Service Health | 3 | ≤ 5 |
| Repeat incidents MTD | Incidents with same root cause as prior incident in 90-day window | Metric card, Incident Funnel | 2 | ≤ 3 |
| MTTR | Mean time from detection to restoration, all severities | Metric card, Service Health and Incident Funnel | 1.8h (current), 2.4h (avg) | ≤ 4.0h |
| RCA completion rate | % of P1/P2 incidents with completed RCA within defined SLA | Metric card, Incident Funnel | 94% | ≥ 90% |
| Severity distribution | Count of incidents by P1/P2/P3/P4 | Donut chart, Incident Funnel | 3/5/7/3 | P1 declining |
| Category breakdown | Count of incidents by root cause category | Bar chart, Incident Funnel | Pipeline 7, DQ 4, Platform 3, Access 2, Viz 2 | Varies |
| Resolution trend | MTTR and closed count over 6 months | Composed chart, Incident Funnel | MTTR: 3.8h → 2.4h over 6 months | Improving |

### Metric Calculation Notes

**MTTR:** The dashboard displays two MTTR values — a current-month average (2.4h) and a rolling metric (1.8h). In this app, these are sample values. In a production system, MTTR is calculated as the mean of (resolution_timestamp − detection_timestamp) across all incidents in the measurement window.

**Repeat incident rate:** Identifying repeat incidents requires a matching algorithm against root cause classifications from prior RCAs. The sample value (2 repeat incidents) is illustrative of the metric structure.

**RCA completion rate:** The 94% sample value represents the percentage of P1/P2 incidents in the period with a completed RCA document linked to the incident record. The 6% gap represents incidents closed without a completed RCA.

---

## 9. Workplace Application

The SLA and incident operating model described here applies to any managed D&A function that has made service commitments to internal or external stakeholders. Specific contexts:

- **Shared services governance:** When a central D&A function commits to service levels for multiple business units, this model defines the measurement and accountability structure.
- **Managed services delivery:** When operating under a client or vendor SLA, this model defines the operational controls that support SLA attainment tracking and breach management.
- **Platform operations:** When a D&A platform team is responsible for pipeline reliability and data product availability, this model defines how failures are detected, triaged, and resolved.
- **Post-incident governance:** When a significant failure requires executive-level review or client communication, this model defines the RCA process and communication protocol.

The severity definitions, SLA targets, and response time commitments in this document are representative. They should be adapted to specific contractual, organizational, or platform requirements.

---

## 10. Limitations

- This document describes a reference operating model. No integrated incident management system (ServiceNow, Jira SM, PagerDuty) is connected to this repository.
- The dashboard does not implement real-time alerting, automated escalation, or runbook execution.
- MTTR values in the dashboard are simulated. Real MTTR requires detection timestamp capture at alert creation, not ticket creation.
- The RCA process described here assumes a dedicated review meeting. In practice, RCA quality varies significantly with team maturity, time pressure, and organizational culture.
- SLA attainment calculation requires agreed-upon measurement conventions (what counts as downtime, what grace periods apply, how maintenance windows are handled). These conventions are organizational decisions not codified in this document.
- Detection gaps — incidents that occur but are not detected by monitoring — are not accounted for in the simulated data. Real incident management must include unknown-unknown risk.

---

## 11. What This Does Not Claim

- This document does not claim a production incident management workflow is implemented in this repository.
- No incident counts, MTTR values, or RCA rates in the dashboard represent real incidents or real attainment figures.
- No SLA values represent a contractual commitment made to any client or internal stakeholder.
- The dashboard does not generate alerts, send notifications, or trigger escalations.
- This document does not claim integration with ServiceNow, PagerDuty, Jira, or any ITSM platform.

---

## 12. Extension Path

| Extension | Effort | Prerequisites |
|-----------|--------|--------------|
| Connect ServiceNow or Jira SM incident feed via REST API | Medium | Backend API layer, ITSM API credentials, data pipeline |
| Implement real-time MTTR calculation from live incident records | Medium | ITSM integration, timestamp-accurate detection events |
| Add automated P1 alert → stakeholder notification workflow | Medium | Notification integration (Teams/Slack webhook), on-call rotation tool |
| Build runbook library with incident type tagging | Low | Content creation, simple JSON-backed runbook index |
| Add SLA breach history and remediation plan tracking | Medium | Historical SLA data model, remediation workflow component |
| Implement anomaly-based incident detection | High | Statistical modeling, metric streaming, alert pipeline |
| Add post-incident review tracking (PIR completion rate by severity) | Low | PIR record structure in data model, metric card addition |

---

## 13. Interview Talking Points

**On incident severity discipline:**
Severity inflation — calling everything P1 — destroys the signal value of incident classification. P1 should require confirmed business impact and trigger a specific, named response. If the on-call team is skeptical about whether something is a P1, it's probably a P2.

**On RCA quality:**
A good root cause analysis does not stop at the technical failure. It asks why the failure was not detected earlier, why the monitoring did not alert, and why the process did not prevent the condition from occurring in the first place. Root cause is a chain, not a single event.

**On MTTR measurement:**
MTTR starts at detection time, not assignment time. A three-hour detection gap before anyone opens a ticket is not magically resolved by a 30-minute fix. The detection-to-acknowledgment window is where a lot of real MTTR hides.

**On repeat incident governance:**
The repeat incident metric is one of the most important leading indicators for operational health. If the same failure is happening more than once, the RCA process produced an insufficient or unimplemented prevention action. Two repeat incidents in a month should trigger a review of every prior RCA for that service area.

**On SLA measurement conventions:**
Before the first SLA breach conversation with a stakeholder, you need agreed-upon measurement conventions: what counts as unavailability, what maintenance windows are excluded, what grace periods apply. Without those conventions, every SLA breach becomes a negotiation about the definition, not a discussion about the fix.

**On the dashboard's role:**
The Incident Funnel tab shows the output of this model — volume, severity, category, MTTR trend. A service owner who understands this model can walk a stakeholder through that dashboard and explain not just what the numbers mean, but what operational processes produced them and what happens when they deteriorate.
