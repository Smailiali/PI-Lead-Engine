// Seed route — full implementation in Step 21
import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ message: 'Seed route not yet implemented' }, { status: 501 })
}
