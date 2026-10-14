Roadworks.info — V2 D1 Database Schema
D1 is the authoritative structured store for current‑state roadworks, event metadata, and optional geometry caching.
Historic raw events are stored in R2 and managed via Basin Catalog; D1 only stores the latest processed state of each roadwork.

This document defines the schema, indexes, constraints, and design rationale for the D1 database used in roadworks.info V2.

1. Design Principles
Current‑state only  
D1 stores the latest processed version of each roadwork.
Historic data lives in R2 + Basin.

Small, fast tables  
D1 is optimized for low‑latency reads from Workers.

Simple SQL  
No complex joins, no spatial functions, no heavy analytics.

Deterministic writes  
Processor Worker uses UPSERT semantics to ensure idempotency.

Geometry stored as GeoJSON  
D1 stores geometry as TEXT; spatial filtering is approximate.

2. Tables Overview
D1 contains three core tables:

current_events  
Final‑state roadwork objects.

event_metadata  
Hashes, timestamps, lineage, and processing info.

geometry_cache (optional)  
Precomputed GeoJSON for fast map rendering.

3. Table: current_events
This is the main table powering the public map and API.

Schema
sql
CREATE TABLE current_events (
    event_id TEXT PRIMARY KEY,
    reference_number TEXT,
    authority TEXT,
    status TEXT,
    category TEXT,
    description TEXT,
    start_date TEXT,
    end_date TEXT,
    last_updated TEXT,
    road_name TEXT,
    location TEXT,
    geojson TEXT,          -- stored as TEXT
    bbox_min_lat REAL,
    bbox_min_lon REAL,
    bbox_max_lat REAL,
    bbox_max_lon REAL
);
Notes
event_id is the canonical Street Manager ID.

geojson is a stringified GeoJSON object.

Bounding box fields allow approximate spatial filtering without PostGIS.

Dates stored as ISO strings for simplicity and Worker compatibility.

Indexes
sql
CREATE INDEX idx_current_events_status ON current_events(status);
CREATE INDEX idx_current_events_authority ON current_events(authority);
CREATE INDEX idx_current_events_last_updated ON current_events(last_updated);
CREATE INDEX idx_current_events_bbox ON current_events(
    bbox_min_lat, bbox_min_lon, bbox_max_lat, bbox_max_lon
);
Query Examples
All active works:

sql
SELECT * FROM current_events WHERE status = 'in_progress';
Bounding box filter:

sql
SELECT * FROM current_events
WHERE bbox_min_lat <= :maxLat
  AND bbox_max_lat >= :minLat
  AND bbox_min_lon <= :maxLon
  AND bbox_max_lon >= :minLon;
4. Table: event_metadata
Tracks lineage, hashes, and processing details.

Schema
sql
CREATE TABLE event_metadata (
    event_id TEXT PRIMARY KEY,
    raw_r2_path TEXT,
    reducer_hash TEXT,
    geometry_hash TEXT,
    received_at TEXT,
    processed_at TEXT,
    attempts INTEGER DEFAULT 1
);
Notes
raw_r2_path points to the raw JSON event in R2.

reducer_hash ensures deterministic merging.

geometry_hash ensures geometry consistency.

attempts tracks retries from the queue.

Indexes
sql
CREATE INDEX idx_event_metadata_processed_at ON event_metadata(processed_at);
5. Table: geometry_cache (optional)
Used only if you want to precompute simplified geometries or multiple zoom‑level variants.

Schema
sql
CREATE TABLE geometry_cache (
    event_id TEXT PRIMARY KEY,
    geojson TEXT,
    simplified_geojson TEXT,
    last_updated TEXT
);
Notes
Optional table — not required for MVP.

Useful if you later generate vector tiles or multi‑resolution geometries.

6. Write Semantics (UPSERT)
Processor Worker writes using UPSERT:

sql
INSERT INTO current_events (...) VALUES (...)
ON CONFLICT(event_id) DO UPDATE SET
    reference_number = excluded.reference_number,
    authority = excluded.authority,
    status = excluded.status,
    category = excluded.category,
    description = excluded.description,
    start_date = excluded.start_date,
    end_date = excluded.end_date,
    last_updated = excluded.last_updated,
    road_name = excluded.road_name,
    location = excluded.location,
    geojson = excluded.geojson,
    bbox_min_lat = excluded.bbox_min_lat,
    bbox_min_lon = excluded.bbox_min_lon,
    bbox_max_lat = excluded.bbox_max_lat,
    bbox_max_lon = excluded.bbox_max_lon;
This ensures:

idempotency

deterministic updates

safe retries

no duplicate rows

7. Read Patterns
Workers read from D1 using simple queries:

All current works
sql
SELECT * FROM current_events;
Filter by authority
sql
SELECT * FROM current_events WHERE authority = ?;
Filter by bounding box
sql
SELECT * FROM current_events
WHERE bbox_min_lat <= ?
  AND bbox_max_lat >= ?
  AND bbox_min_lon <= ?
  AND bbox_max_lon >= ?;
Fetch metadata
sql
SELECT * FROM event_metadata WHERE event_id = ?;
8. Why This Schema Works
Small tables → fast reads

Simple columns → easy ingestion

Bounding boxes → spatial filtering without PostGIS

UPSERT logic → deterministic processing

Metadata separation → clean audit trail

Optional geometry cache → future expansion

This schema is intentionally minimal, fast, and Cloudflare‑native.

9. Future Migration Path (Supabase PostGIS)
If you later upgrade:

geojson becomes geometry(Geometry, 4326)

bounding boxes become ST_Envelope(geometry)

spatial indexes become GIST(geometry)

queries become:

sql
SELECT * FROM current_events
WHERE ST_Intersects(geometry, ST_MakeEnvelope(...));
The migration is straightforward because the schema is already cleanly separated.

10. Summary
D1 stores:

the latest processed state of each roadwork

metadata for lineage and audit

optional geometry caches
