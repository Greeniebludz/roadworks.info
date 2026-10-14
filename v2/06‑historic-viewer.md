Roadworks.info — V2 Historic Viewer
The historic viewer provides access to past roadworks data, allowing users to explore how works evolved over time, view daily snapshots, inspect raw events, and analyse long‑term trends.
It is powered by R2 (raw + Iceberg), Basin Catalog (metadata), and Basin SQL (analytics), with the frontend delivered by Workers.

This document describes how historic data is stored, queried, and presented in the V2 frontend.

1. Goals of the Historic Viewer
Provide a simple, intuitive interface for browsing past roadworks

Allow users to view daily/weekly/monthly snapshots

Enable inspection of raw Street Manager events

Support lightweight analytics (counts, durations, categories)

Keep historic queries off D1 (current‑state only)

Use Basin SQL for efficient, scalable historic queries

Maintain replayability via R2 + Iceberg

The historic viewer is intentionally separate from the live map.

2. Historic Data Sources
The historic viewer uses three data sources:

2.1 R2 Raw Events
Immutable raw JSON

Stored per‑event, per‑day

Used for “view raw event” functionality

Used for replaying ingestion pipeline if needed

2.2 Iceberg Tables (via Basin Catalog)
Weekly snapshots

Partitioned by date

Schema evolution supported

Efficient scanning for analytics

Managed by Basin Catalog

2.3 Basin SQL
Query engine for Iceberg tables

Used for:

daily summaries

category breakdowns

authority-level aggregates

historic counts

trend analysis

Basin SQL is not used for live map queries.

3. Frontend Layout
The historic viewer is a separate page:

Code
/history
It contains:

Date selector

Summary panel

Optional map overlay

Raw event inspector

Trend charts (optional)

The UI is intentionally lightweight.

4. User Workflow
4.1 Select a Date
User chooses a date:

from a calendar

from a dropdown

from a timeline slider

The frontend requests:

Code
GET /api/historic?date=YYYY-MM-DD
4.2 View Daily Summary
The API returns:

total works

works by status

works by authority

works by category

optional geometry aggregates

Data source: Basin SQL

4.3 View Works for That Day
User selects:

“View works for this day”

The frontend requests:

Code
GET /api/historic/list?date=YYYY-MM-DD
This returns:

list of works active on that date

bounding boxes

simplified geometry

Data source: Basin SQL

4.4 Inspect Raw Event
User clicks a work → “View raw event”.

Frontend requests:

Code
GET /api/event/:id
Data source: R2

4.5 Compare With Current State
Optional:

Code
GET /api/current/:id
Data source: D1

This allows users to see how a work changed over time.

5. API Endpoints
5.1 Daily Summary
Code
GET /api/historic?date=YYYY-MM-DD
Returns:

counts

aggregates

category breakdowns

authority breakdowns

5.2 Daily Work List
Code
GET /api/historic/list?date=YYYY-MM-DD
Returns:

list of works active on that date

simplified geometry

bounding boxes

5.3 Raw Event Lookup
Code
GET /api/event/:id
Returns:

raw JSON

metadata

R2 path

5.4 Trend Data
Code
GET /api/historic/trends?range=YYYY-MM-DD..YYYY-MM-DD
Returns:

counts over time

optional category trends

6. Basin SQL Query Patterns
6.1 Daily Summary
sql
SELECT
  COUNT(*) AS total,
  status,
  COUNT(*) AS count
FROM iceberg_events
WHERE date = :date
GROUP BY status;
6.2 Daily Work List
sql
SELECT
  event_id,
  authority,
  category,
  status,
  bbox_min_lat,
  bbox_min_lon,
  bbox_max_lat,
  bbox_max_lon,
  simplified_geojson
FROM iceberg_events
WHERE date = :date;
6.3 Trend Analysis
sql
SELECT
  date,
  COUNT(*) AS total
FROM iceberg_events
WHERE date BETWEEN :start AND :end
GROUP BY date
ORDER BY date;
These queries run in Basin SQL, not D1.

7. Caching Strategy
Daily Summaries
Cache for 24 hours

Basin SQL results are stable

Daily Work Lists
Cache for 6 hours

Data does not change after ingestion

Raw Event Lookup
Cache for 1 hour

R2 objects are immutable

8. Performance Characteristics
Basin SQL handles large historic datasets efficiently

R2 provides cheap, durable raw storage

Frontend Worker caches aggressively

No load on D1 for historic queries

No heavy processing in the frontend

This keeps the historic viewer fast and scalable.

9. Future Enhancements
timeline playback

“diff view” between dates

authority-level dashboards

postcode-based historic search

route-based historic queries

vector tile generation via Basin SQL

export historic datasets

All optional — V2 does not require them.

10. Summary
The historic viewer provides a clean, efficient interface for exploring past roadworks using:

R2 for raw events

Iceberg for historic tables

Basin Catalog for metadata

Basin SQL for analytics

Workers for delivery
