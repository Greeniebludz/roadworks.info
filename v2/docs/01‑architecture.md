Roadworks.info — V2 Architecture Overview
Roadworks.info V2 is a fully Cloudflare‑native platform for ingesting, processing, storing, and serving UK roadworks data.
The system is designed for reliability, replayability, low‑latency global delivery, and long‑term historic storage — without relying on external databases or hosting.

V2 replaces the original monolithic design with a modular, event‑driven architecture built on Workers, Queues, R2, D1, and Basin services.

1. Architectural Goals
Cloudflare‑native execution  
Workers, Queues, R2, D1, KV, Basin Catalog, Basin SQL.

Event‑driven ingestion pipeline  
Raw events are captured immediately and processed asynchronously.

Current‑state + historic separation  
D1 stores the latest processed state.
R2 + Iceberg (via Basin Catalog) store raw and historic data.

Replayability  
The entire system can be rebuilt from raw R2 data.

Low-latency global delivery  
Frontend and API Workers run at the edge.

Cost‑efficient scaling  
Workers, Queues, R2, and Basin are billed independently of the website plan.

2. High-Level System Components
The V2 architecture consists of:

Ingestion Worker

Processing Worker (Queue consumer)

D1 Database (current-state model)

R2 Historic Archive (raw + weekly snapshots)

Basin Catalog + Iceberg (historic table format)

Basin SQL (analytics, not live map queries)

Frontend/API Worker (public map + dashboard)

Scheduled Workers (polling, archival, DLQ sweeps)

Each component is isolated, testable, and independently scalable.

3. Data Flow Overview
Step 1 — Street Manager → Ingestion Worker
Receives SNS-style pushes or scheduled polling.

Validates payload.

Stores raw event in R2.

Enqueues processing job.

Step 2 — Cloudflare Queue → Processing Worker
Loads raw event from R2.

Applies reducer logic.

Validates and converts geometry.

Writes final-state record to D1.

Writes metadata to D1.

Sends failures to DLQ.

Step 3 — Weekly Archival → R2 + Iceberg
Scheduled Worker batches raw events.

Writes Iceberg‑formatted snapshots to R2.

Basin Catalog manages metadata.

Basin SQL enables historic analytics.

Step 4 — Frontend/API Worker → Browser
Serves static HTML/CSS/JS.

Provides API endpoints for:

current events (D1)

historic summaries (Basin SQL)

raw event lookup (R2)

Leaflet renders the map.

4. Component Responsibilities
4.1 Ingestion Worker
Accepts Street Manager payloads

Writes raw events to R2

Enqueues processing jobs

Handles malformed data

Responds quickly (no heavy work)

4.2 Processing Worker
Consumes queue messages

Loads raw event from R2

Applies reducer logic

Converts geometry

Writes final-state record to D1

Writes metadata

Sends failures to DLQ

Idempotent by design

4.3 D1 Database (Current-State Model)
Stores:

latest processed roadwork state

metadata (hashes, timestamps, lineage)

optional geometry cache

D1 is chosen because:

it is Cloudflare-native

it is extremely fast for reads

it is cheap

it handles your concurrency needs

it simplifies the architecture

Supabase/PostGIS remains a future option if advanced geospatial queries are required.

4.4 R2 Historic Archive
Stores:

raw events

weekly snapshots

Iceberg tables (via Basin Catalog)

R2 is the authoritative historic store.

4.5 Basin Catalog + Iceberg
Iceberg is a table format, not a compute engine.

Basin Catalog manages Iceberg metadata.

Basin SQL provides historic analytics.

Basin SQL is not used for live map queries.

4.6 Frontend/API Worker
Serves static assets

Provides API endpoints

Handles caching

Integrates with Leaflet

Reads from D1 for current-state queries

Reads from Basin SQL for historic summaries

Reads from R2 for raw event lookup

4.7 Scheduled Workers
Poll Street Manager

Sweep DLQ

Perform weekly archival

Reconcile ingestion failures

Evict stale data if needed

5. Database Strategy
Current-State Database: D1
D1 is locked in for V2 because:

your dataset is small

your queries are simple

your concurrency is modest

your geometry is lightweight

your cost sensitivity is high

your architecture benefits from Cloudflare-native simplicity

Historic Database: R2 + Iceberg
Raw and historic data live in R2.
Iceberg tables provide:

schema evolution

partitioning

metadata

replayability

analytics via Basin SQL

Future Upgrade Path: Supabase PostGIS
Supabase becomes relevant only if you introduce:

proximity search

polygon intersection

route-based queries

vector tiles

complex spatial filtering

heavy analytics

multi-region concurrency

V2 does not require this.

6. Observability & Monitoring
Worker logs

Queue metrics

R2 access logs

Basin Catalog metadata

DLQ inspection

Optional Logpush for operational logs
(Logpush is not a business archive)

7. Deployment Model
dev — local + preview

staging — test ingestion + processing

prod — live roadworks.info

All deployed via Wrangler.

8. Summary
Roadworks.info V2 is a modern, Cloudflare-native, event-driven system built for speed, reliability, and long-term historic storage.

Key design choices:

D1 for current-state

R2 + Iceberg for historic

Basin SQL for analytics

Workers + Queues for ingestion and processing

Frontend Worker for global delivery

This architecture is simple, scalable, cheap, and future-proof — and it positions roadworks.info as a high-performance public data platform.
