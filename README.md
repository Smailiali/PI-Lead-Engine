# PI Lead Engine

A full-stack lead generation and attribution pipeline for personal injury law firms.

Built to demonstrate the complete lead lifecycle: ad click > landing page > multi-step intake form > AI case screening > webhook middleware > attributed lead storage > admin dashboard.

---

## Why I Built This

Personal injury law firms live and die by their intake pipeline. A firm spending $50K/month on Google Ads needs to know exactly which campaigns produce signed cases, not just form submissions. After studying how PI marketing agencies connect GoHighLevel to LeadDocket, I built this project to demonstrate the full attribution and intake stack -- from the first ad click to a qualified, AI-screened lead in the CRM.

This project uses GoHighLevel's real `ContactCreate` webhook payload format, demonstrating familiarity with the platform's integration patterns without requiring a paid account.

---

## How This Maps to the Role

| Job Requirement | How This Project Demonstrates It |
|---|---|
| Performance Landing Pages | Mobile-first PI landing page with multi-step form, social proof, click-to-call, and premium gold/navy design |
| GHL Architecture and API | Webhook receiver using GHL's real `ContactCreate` payload format with validation and transformation |
| LeadDocket Integration | Middleware pipeline that processes, enriches, and stores leads with full attribution data |
| API and Middleware | Custom Next.js API routes connecting form > webhook > AI screener > PostgreSQL database |
| Tracking and Attribution | UTM parameter capture, GCLID tracking, source-to-lead attribution dashboard with Recharts |
| AI Implementation | Claude-powered case screener with structured scoring, viability rating, and intake recommendations |
| A/B Testing and CRO | (Next step: multi-variant landing page testing with Vercel Edge Config) |

---

## Architecture

```
Ad Click (UTM params in URL)
        |
        v
Landing Page (Next.js)
  - Captures UTM/GCLID from URL on page load
  - Multi-step intake form stores params in state
        |
        v
POST /api/submit
  - Receives LeadFormData + UTMParams
  - Calls processLead() middleware pipeline
        |
        v
Lead Processing Pipeline (src/lib/middleware.ts)
  1. Create WebhookLog (status: "received")
  2. Insert Lead into PostgreSQL via Prisma
  3. Update WebhookLog (status: "processed")
  4. POST to /api/screen (Claude AI screener)
  5. Update Lead with AI scoring results
  6. Update WebhookLog (status: "screened" -> "stored")
  7. Return complete Lead object
        |
        v
AI Case Screener (Claude claude-sonnet-4-20250514)
  - Scores the case 1-10
  - Identifies case type, viability, estimated value range
  - Flags urgency and red flags
  - Returns structured JSON recommendation
        |
        v
Admin Dashboard (/admin)
  - Lead table with filters and sorting
  - Per-lead AI assessment and attribution detail
  - Attribution chart by campaign/source (Recharts)
  - Webhook log viewer with raw payload inspection
  - GHL simulator button for live demo

GHL Webhook (parallel path)
  POST /api/webhook/ghl
  - Validates GHL ContactCreate payload
  - Transforms to Lead format
  - Feeds same processLead() pipeline
  POST /api/simulate
  - Generates realistic mock GHL payload
  - Fires it through the webhook path
  - Used for demo purposes
```

---

## Tech Stack

- **Framework:** Next.js 14 (App Router, Server + Client Components)
- **Language:** TypeScript (strict mode, zero `any` types)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **AI:** Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Database:** PostgreSQL via Prisma ORM (hosted on Neon)
- **Deployment:** Vercel

---

## Screenshots

### Landing Page
Premium gold-and-navy law firm landing page with multi-step intake form, social proof bar, practice area cards, testimonials, and FAQ.

### Admin Dashboard
Dark data-dense internal tool with lead table, AI assessment cards, attribution charts, and webhook log viewer.

---

## Running Locally

**Prerequisites:** Node.js 20+, a Neon PostgreSQL database, an Anthropic API key.

**1. Clone the repo**

```bash
git clone https://github.com/smailiali/pi-lead-engine.git
cd pi-lead-engine
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create `.env.local`:

```
DATABASE_URL=your_neon_postgresql_connection_string
ANTHROPIC_API_KEY=your_anthropic_api_key
```

**4. Push the database schema**

```bash
npx prisma db push
```

**5. Seed demo data**

```bash
curl -X POST http://localhost:3000/api/seed
```

**6. Start the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page and [http://localhost:3000/admin](http://localhost:3000/admin) for the dashboard.

---

## Key Flows to Test

1. **Form submission:** Fill out the intake form on the landing page. Watch the thank-you page show your AI case assessment.
2. **Admin dashboard:** Visit `/admin` to see the lead in the table with attribution and AI score.
3. **Lead detail:** Click any lead to see the full AI assessment and attribution card.
4. **GHL simulator:** Go to `/admin/webhook-log` and click "Simulate GHL Webhook" to fire a mock payload through the full pipeline.
5. **Attribution:** Visit `/admin/attribution` to see leads grouped by campaign and source.

---

## Live Demo

[https://pi-lead-engine.vercel.app](https://pi-lead-engine.vercel.app)

---

Built by Ali Smaili -- [GitHub](https://github.com/smailiali) | [LinkedIn](https://linkedin.com/in/smailiali)
