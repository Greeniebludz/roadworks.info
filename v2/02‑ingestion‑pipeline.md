Roadworks.info — V2 Ingestion Pipeline
The ingestion pipeline is responsible for receiving Street Manager events, validating them, storing raw data, and triggering downstream processing.
It is intentionally lightweight, resilient, and fully Cloudflare‑native, using Workers, Queues, R2, and scheduled triggers.

This document describes how raw events enter the system and how they are prepared for processing.

1. Goals of the Ingestion Pipeline
Capture every Street Manager event reliably and immediately

Store raw events durably in R2 for replay and historic analysis

Decouple ingestion from processing using Cloudflare Queues

Respond fast — no heavy work in the ingestion Worker

Handle malformed or partial data without losing events

Support both push and polling models

The ingestion pipeline is the first stage of the V2 event‑driven architecture.

2. Ingestion Sources
V2 supports two ingestion paths:

2.1 HTTPS Push (preferred)
Street Manager sends events directly to the ingestion Worker via HTTPS.

2.2 Scheduled Polling (fallback)
A scheduled Worker polls the Street Manager API every 60 minutes to reconcile missed or delayed events.

Polling ensures:

resilience against SNS outages

recovery from ingestion failures

consistency with Street Manager’s authoritative state

Both paths feed into the same ingestion Worker logic.

3. Ingestion Worker Responsibilities
The ingestion Worker performs four critical tasks:

3.1 Validate Incoming Payload
Ensure JSON is present

Ensure required fields exist (eventId, timestamps, geometry, etc.)

Normalise field names

Attach ingestion metadata:

received_at

source (push or poll)

event_hash

Malformed payloads are quarantined (see §7).

3.2 Store Raw Event in R2
Raw events are written immediately to R2 under a deterministic path:

Code
r2://roadworks-raw/YYYY/MM/DD/<event-id>.json
This ensures:

durability

replayability

auditability

independence from D1’s retention limits

Raw events are the authoritative business archive — not Logpush.

3.3 Enqueue Processing Job
After storing the raw event, the Worker enqueues a message into the processing queue:

Code
{
  "event_id": "...",
  "r2_path": "YYYY/MM/DD/<event-id>.json",
  "received_at": "...",
  "attempt": 1
}
This message triggers the Processing Worker.

The ingestion Worker does no reducer logic, no geometry work, and no D1 writes.

3.4 Respond Quickly
Once the raw event is stored and the queue message is enqueued, the Worker returns:

Code
200 OK
This keeps ingestion fast and scalable.

4. Queue Structure
Queue: roadworks-process
Each message contains:

Field	Description
event_id	Unique Street Manager event ID
r2_path	Raw event location
received_at	Timestamp
attempt	Retry counter


The queue provides:

backpressure handling

automatic retries

isolation between ingestion and processing

predictable throughput

5. Scheduled Reconciliation Poller
A scheduled Worker runs every 60 minutes to:

poll Street Manager for authoritative state

detect missed or delayed events

enqueue reconciliation jobs

ensure consistency with Street Manager’s ledger

This mirrors the “Reconciliation poller” in your diagram.

6. Idempotency
The ingestion Worker is fully idempotent:

Same event → same R2 path

Same queue message → same processing behaviour

Processor Worker handles deduplication

This ensures safe retries from Street Manager and safe replay from R2.

7. Error Handling
7.1 Malformed Payloads
Malformed events are stored in a separate R2 bucket:

Code
r2://roadworks-bad-events/YYYY/MM/DD/<uuid>.json
The Worker returns 400 Bad Request.

7.2 R2 Write Failures
If R2 write fails:

event is not enqueued

Worker returns 503

Street Manager retries automatically

7.3 Queue Enqueue Failures
If enqueue fails:

raw event is still stored

Worker retries enqueue

persistent failures are logged to KV:

Code
kv:failed-enqueues[event-id] = r2_path
a scheduled Worker replays failed enqueues every 5 minutes

7.4 Dead-Letter Queue (DLQ)
Processing failures are handled in the DLQ (covered in 03‑processing‑pipeline.md).

8. Performance Characteristics
Ingestion Worker runs at Cloudflare edge → extremely low latency

R2 writes are fast and globally distributed

Queue enqueue operations are lightweight

No synchronous database writes

No geometry conversion

No reducer logic

This keeps ingestion fast even under heavy load.

9. Example Ingestion Flow
Incoming Event
Code
POST /ingest
{
  "eventId": "12345",
  "geometry": "...",
  "status": "planned",
  ...
}
Worker Actions
Validate JSON

Store raw event in R2:

Code
roadworks-raw/2026/10/14/12345.json
Enqueue processing job

Return 200 OK

Processor Worker picks up the job
(covered in 03‑processing‑pipeline.md)

10. Summary
The ingestion pipeline is intentionally simple:

Store raw event

Enqueue processing job

Respond immediately

This design ensures reliability, replayability, and scalability — forming the foundation of the entire V2 system.
