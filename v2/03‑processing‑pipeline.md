Roadworks.info — V2 Processing Pipeline
The processing pipeline transforms raw Street Manager events into validated, merged, geometry‑safe, final‑state roadwork records.
It runs asynchronously via Cloudflare Queues and writes structured data into D1, while maintaining full replayability through R2 and Basin.

This document describes the Processing Worker, reducer logic, geometry handling, dead‑letter queue behaviour, and how final‑state data enters the current‑state model.

1. Goals of the Processing Pipeline
Convert raw R2 events into clean, structured final‑state objects

Apply deterministic reducer logic to merge updates

Validate and convert geometry (WKT → GeoJSON)

Write final‑state records to D1

Maintain lineage and metadata

Handle failures gracefully via DLQ

Ensure full replayability from R2

Keep processing fast, predictable, and Cloudflare‑native

The Processing Worker is the core of the V2 data model.

2. High-Level Flow
Ingestion Worker stores raw event in R2

Ingestion Worker enqueues processing job

Processing Worker consumes queue message

Processing Worker loads raw event from R2

Processing Worker applies reducer logic

Processing Worker validates and converts geometry

Processing Worker writes final-state record to D1

Processing Worker writes metadata to D1

Failures → DLQ

Scheduled Worker sweeps DLQ for retries

This pipeline ensures reliability, determinism, and replayability.

3. Processing Worker Responsibilities
3.1 Load Raw Event from R2
The queue message contains:

event_id

r2_path

received_at

attempt

The Worker fetches the raw JSON from R2 and validates:

required fields

timestamps

geometry presence

event ID consistency

Malformed events are sent directly to the DLQ.

3.2 Apply Reducer Logic
Street Manager sends multiple updates per roadwork:

planned

permit submitted

permit granted

works started

works paused

works completed

works cancelled

reinstatement

closure

reopening

The reducer merges these into a single canonical object.

Reducer responsibilities:

merge fields deterministically

preserve authoritative timestamps

track status transitions

maintain lineage

ensure idempotency

compute a reducer hash for metadata

Reducer output is the final‑state roadwork object written to D1.

3.3 Geometry Validation & Conversion
Geometry arrives as WKT or GeoJSON depending on the Street Manager event type.

The Worker:

Validates geometry format

Converts WKT → GeoJSON if needed

Normalises coordinate order

Ensures geometry is within UK bounds

Computes bounding box

Computes geometry hash

Optionally writes simplified geometry to geometry_cache

If geometry fails validation:

event goes to DLQ

metadata logs the failure

Geometry is stored in D1 as TEXT GeoJSON, not as a spatial type.

3.4 Write Final-State Record to D1
The Worker writes:

final‑state roadwork → current_events

lineage + metadata → event_metadata

Writes use UPSERT semantics:

safe retries

deterministic updates

idempotent behaviour

This ensures that:

duplicate events do not create duplicates

retries do not corrupt state

replaying historic R2 data is safe

4. Dead-Letter Queue (DLQ)
Events that cannot be processed are sent to the DLQ.

DLQ reasons include:
malformed JSON

missing required fields

invalid geometry

reducer exceptions

repeated D1 write failures

unexpected schema changes

corrupted R2 objects

DLQ entry contains:
event ID

R2 path

error type

error message

attempt count

timestamp

DLQ Sweep Worker
A scheduled Worker runs every hour to:

retry DLQ events

escalate persistent failures

log unrecoverable events to KV

notify via optional webhook

This mirrors the “Dead-letter queue” and “Scheduled liveness sweep” in your diagram.

5. Idempotency
The Processing Worker is fully idempotent:

Same raw event → same reducer output

Same geometry → same GeoJSON + bounding box

Same event ID → same UPSERT behaviour

Same metadata → same lineage record

This ensures:

safe retries

safe replay from R2

safe reconciliation from polling

deterministic final-state records

Idempotency is a core design requirement of V2.

6. Performance Characteristics
Queue consumption is parallel and fast

R2 reads are cheap and globally distributed

Geometry conversion is lightweight

D1 writes are small and predictable

No heavy CPU or memory usage

No external DB latency

No synchronous ingestion bottlenecks

The pipeline scales horizontally across Cloudflare’s global network.

7. Example Processing Flow
Queue Message
Code
{
  "event_id": "12345",
  "r2_path": "2026/10/14/12345.json",
  "received_at": "2026-10-14T17:22:00Z",
  "attempt": 1
}
Worker Actions
Load raw event from R2

Validate payload

Apply reducer

Convert geometry

Compute bounding box

Write final-state record to D1

Write metadata

Acknowledge queue message

If failure occurs
Send to DLQ

Retry later via sweep Worker

8. Interaction with Basin & Iceberg
Processing Worker does not write to Basin or Iceberg.

Instead:

raw events → R2

weekly archival Worker → Iceberg tables

Basin Catalog manages Iceberg metadata

Basin SQL provides historic analytics

Processing Worker only writes current-state data to D1.

This separation keeps the architecture clean and scalable.

9. Summary
The processing pipeline transforms raw Street Manager events into validated, merged, geometry‑safe final‑state records stored in D1.
It is fully Cloudflare‑native, resilient, idempotent, and designed for long-term reliability and replayability.

This pipeline forms the core of the V2 data model and powers the public map, API, and dashboard.
