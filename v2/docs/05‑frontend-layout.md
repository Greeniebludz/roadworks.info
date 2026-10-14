Roadworks.info — V2 Frontend Layout & Delivery Architecture
The V2 frontend is a lightweight, Cloudflare‑native web application served entirely from Workers.
It is designed for speed, simplicity, reliability, and global delivery, with no frameworks, no bundlers, and no external hosting.

This document describes the structure of the frontend, how it is served, how it interacts with D1 and R2, and how the public map and dashboard are composed.

1. Frontend Goals
Fast global delivery via Cloudflare Workers

Zero framework overhead (no React, Vue, Angular)

Simple, maintainable code (HTML + CSS + JS)

Leaflet-based map for rendering roadworks

API-first architecture

Separation of UI and data

Cache-friendly responses

Mobile-friendly layout

No build step required

The frontend is intentionally minimal — the complexity lives in the ingestion and processing pipeline, not the UI.

2. Frontend Worker Responsibilities
The Frontend Worker:

Serves static assets (HTML, CSS, JS, icons)

Serves the public API endpoints

Handles caching and ETags

Performs lightweight request routing

Reads current-state data from D1

Reads historic summaries from Basin SQL

Reads raw events from R2 (on demand)

Provides JSON responses for map layers

Ensures fast, predictable performance

The Worker is the single entry point for all public interactions.

3. Directory Structure
The V2 frontend uses a simple, flat structure:

Code
/frontend
  index.html
  styles.css
  app.js
  leaflet.css
  leaflet.js
  icons/
    roadwork.png
    closure.png
    diversion.png
  api/
    current.json
    historic.json
    event/:id.json
All files are served directly by the Frontend Worker.

4. Page Layout
4.1 index.html
The main page contains:

Header

Map container

Filter panel

Footer

The layout is intentionally simple:

Code
<header>
  <h1>roadworks.info</h1>
</header>

<div id="map"></div>

<div id="filters">
  <!-- status, authority, date range -->
</div>

<footer>
  <p>Data from Street Manager</p>
</footer>
No frameworks.
No build step.
No client-side routing.

5. Map Rendering (Leaflet)
Leaflet is used because:

lightweight

fast

easy to customise

works everywhere

no bundler required

perfect for simple GeoJSON overlays

Map Layers
The map loads:

current events from D1

historic summaries from Basin SQL

raw event lookup from R2 (on click)

Pin Rendering
Pins are rendered using:

custom icons

colour-coded statuses

optional category overlays

Pins use the bounding box + GeoJSON stored in D1.

6. Public API Endpoints
The Frontend Worker exposes a small set of API endpoints.

6.1 Current Events
Code
GET /api/current
Returns:

final-state roadworks

bounding boxes

GeoJSON

metadata

Data source: D1

6.2 Historic Summaries
Code
GET /api/historic?date=YYYY-MM-DD
Returns:

aggregated counts

daily summaries

optional geometry aggregates

Data source: Basin SQL

6.3 Raw Event Lookup
Code
GET /api/event/:id
Returns:

raw event JSON

metadata

R2 path

Data source: R2

6.4 Health Check
Code
GET /api/health
Returns:

ingestion status

queue depth

last successful processing

D1 row count

Data source: Workers + D1

7. Caching Strategy
Static Assets
Cache for 30 days

Immutable

Served from edge

Current Events
Cache for 30–60 seconds

ETag support

Stale-while-revalidate

Historic Summaries
Cache for 24 hours

Basin SQL results are stable

Raw Event Lookup
Cache for 1 hour

R2 objects are immutable

This ensures fast delivery without stale data.

8. Mobile Layout
The frontend is responsive:

collapsible filter panel

full-screen map

touch-friendly pins

simplified popups

No separate mobile site required.

9. Error Handling
The frontend displays:

“No data available”

“Unable to load map”

“Event not found”

“Historic data unavailable”

Errors are logged via:

Worker logs

optional Sentry integration

10. Why This Layout Works
Simple — easy to maintain

Fast — minimal JS, edge delivery

Reliable — no external dependencies

Scalable — Workers + D1 + R2 + Basin

Replayable — raw events always accessible

Future-proof — can evolve into vector tiles later

This layout is intentionally minimal and robust.

11. Future Enhancements
vector tile generation (via Basin SQL or PostGIS)

advanced filtering

timeline playback

authority dashboards

postcode search

route-based queries

mobile app wrapper

All optional — V2 does not require them.

12. Summary
The V2 frontend is a lightweight, Cloudflare-native application built on:

Workers

Leaflet

D1

R2

Basin SQL

It is fast, simple, reliable, and designed for long-term maintainability.
