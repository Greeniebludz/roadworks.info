Roadworks.info — V2 Architecture Overview
Roadworks.info V2 is a fully Cloudflare‑native platform for ingesting, processing, storing, and visualising UK roadworks data.
The entire system runs on Cloudflare’s global edge network using Workers, Queues, R2, KV, and D1.

No external databases.
No third‑party hosting.
No dependencies outside the Cloudflare ecosystem.

1. Architectural Goals
100% Cloudflare-native  
Workers, R2, KV, D1, Queues — nothing else.

Event-driven ingestion  
Every Street Manager update is processed deterministically.

Historic-first storage  
Raw and processed events are archived permanently in R2.

Simple, predictable data model  
D1 for structured metadata, R2 for bulk historic storage.

Fast, lightweight frontend  
Served directly from Workers with zero framework bloat.

2. High-Level Architecture
The system consists of:

Ingestion Worker

Processing Worker (Queue consumer)

D1 Database (current state + metadata)

R2 Historic Archive (raw + weekly snapshots)

Frontend Worker + Leaflet UI

Everything runs inside Cloudflare.

3. Data Flow Overview
Step 1 — Street Manager → Ingestion Worker
Receives push or poll updates.

Validates payload.

Stores raw event in R2 (daily bucket).

Enqueues event for processing.

Step 2 — Queue → Processor Worker
Applies reducer logic to build final-state roadwork objects.

Converts geometry (WKT → GeoJSON) using Worker-side libraries.

Writes final-state record to D1.

Step 3 — Weekly Archive → R2
Scheduled Worker compresses the week’s raw events.

Stores them under:

Code
r2://roadworks-archive/YYYY/MM/DD/all_events_raw.json.gz
Step 4 — Frontend Worker → Browser
Serves static HTML/CSS/JS.

Provides API endpoints for:

current roadworks

historic lookups

geometry

Leaflet renders the map.

4. Component Responsibilities
4.1 Ingestion Worker
Accepts Street Manager payloads

Writes raw events to R2

Enqueues processing jobs

Handles malformed data gracefully

4.2 Processor Worker
Consumes queue messages

Applies reducer logic

Converts geometry

Writes final-state records to D1

Ensures idempotency

4.3 D1 Database
Tables include:

current_events — final-state roadworks

event_metadata — timestamps, hashes, audit

geometry_cache — optional precomputed GeoJSON

D1 provides structured SQL storage without external dependencies.

4.4 R2 Historic Archive
Stores raw events

Stores weekly snapshots

Provides long-term durability

Enables future analytics and replay

4.5 Frontend Worker
Serves static assets

Provides API endpoints

Handles caching

Integrates with Leaflet

5. Deployment Model
dev — preview

staging — test ingestion

prod — live roadworks.info

All deployed via Wrangler.

6. Observability
Worker logs

Queue metrics

R2 usage

D1 query logs

Optional Sentry for frontend.

7. Future Extensions
historic timeline playback

alerts (email/webhook)

postcode search

analytics dashboards

mobile UI

8. Summary
Roadworks.info V2 is a fully Cloudflare-native system designed for speed, reliability, and long-term historic storage — without any external databases or services.

This architecture defines the foundation for all V2 components.
