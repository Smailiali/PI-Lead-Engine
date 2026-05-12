import { NextResponse } from 'next/server'
import { seedDemoData } from '@/data/mockLeads'

export async function POST() {
  try {
    const result = await seedDemoData()

    if (result.skipped > 0) {
      return NextResponse.json({
        message: `Database already has ${result.skipped} leads. Skipped seeding.`,
        created: 0,
        skipped: result.skipped,
      })
    }

    return NextResponse.json({
      message: `Successfully seeded ${result.created} leads.`,
      created: result.created,
      skipped: 0,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Seed failed'
    console.error('[/api/seed]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
