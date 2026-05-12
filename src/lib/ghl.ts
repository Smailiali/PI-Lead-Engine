import type { GHLContactCreatePayload } from '@/types/ghl'
import type { Lead } from '@prisma/client'

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isStringRecord(value: unknown): value is Record<string, string> {
  if (!isRecord(value)) return false
  return Object.values(value).every((v) => typeof v === 'string')
}

export function validateGHLPayload(payload: unknown): GHLContactCreatePayload {
  if (!isRecord(payload)) {
    throw new Error('GHL payload must be an object')
  }

  if (payload['type'] !== 'ContactCreate') {
    throw new Error(`Unsupported GHL event type: ${String(payload['type'])}`)
  }

  if (typeof payload['timestamp'] !== 'string') {
    throw new Error('GHL payload missing timestamp')
  }

  if (typeof payload['webhookId'] !== 'string') {
    throw new Error('GHL payload missing webhookId')
  }

  const data = payload['data']
  if (!isRecord(data)) {
    throw new Error('GHL payload missing data object')
  }

  const requiredDataFields = ['id', 'firstName', 'lastName', 'email', 'phone', 'source'] as const
  for (const field of requiredDataFields) {
    if (typeof data[field] !== 'string') {
      throw new Error(`GHL payload data missing required field: ${field}`)
    }
  }

  if (!Array.isArray(data['tags'])) {
    throw new Error('GHL payload data.tags must be an array')
  }

  if (!isStringRecord(data['customField'])) {
    throw new Error('GHL payload data.customField must be a string record')
  }

  const attr = data['attributionSource']
  if (!isRecord(attr)) {
    throw new Error('GHL payload missing attributionSource')
  }

  return payload as unknown as GHLContactCreatePayload
}

// ---------------------------------------------------------------------------
// Transform GHL payload -> Lead fields
// ---------------------------------------------------------------------------

export function transformGHLToLead(payload: GHLContactCreatePayload): Partial<Lead> {
  const { data } = payload
  const { attributionSource: attr, customField } = data

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email || null,
    phone: data.phone,
    accidentType: customField['accidentType'] ?? 'Unknown',
    accidentTiming: customField['accidentTiming'] ?? 'Unknown',
    description: customField['description'] ?? '',
    utmSource: attr.utmSource || null,
    utmMedium: attr.utmMedium || null,
    utmCampaign: attr.utmCampaign || null,
    utmContent: attr.utmContent || null,
    utmTerm: attr.utmTerm || null,
    gclid: attr.gclid || null,
    ghlContactId: data.id,
    ghlSource: data.source || null,
  }
}

// ---------------------------------------------------------------------------
// Mock payload generator
// ---------------------------------------------------------------------------

const ACCIDENT_TYPES = [
  'Car Accident',
  'Truck Accident',
  'Motorcycle Accident',
  'Slip & Fall',
  'Wrongful Death',
]

const ACCIDENT_TIMINGS = ['This week', 'This month', '1-3 months ago', 'More than 3 months ago']

const UTM_SOURCES = ['google_ads', 'facebook', 'instagram', 'referral']
const UTM_MEDIUMS = ['cpc', 'social', 'organic', 'email']
const CAMPAIGNS = [
  'la-car-accident',
  'westwood-pi',
  'truck-accident-brand',
  'slip-fall-retarget',
  'motorcycle-injury-la',
]

const FIRST_NAMES = ['Maria', 'James', 'Linda', 'Robert', 'Patricia', 'Michael', 'Sandra', 'David']
const LAST_NAMES = ['Rodriguez', 'Johnson', 'Martinez', 'Williams', 'Garcia', 'Brown', 'Davis', 'Wilson']

const DESCRIPTIONS = [
  'I was rear-ended at a stoplight on the 405 freeway. The other driver was on their phone. I have neck and back pain and have been to the ER twice.',
  'A commercial truck ran a red light and hit my vehicle on the driver side. I have a fractured rib and whiplash. The truck had a dashcam.',
  'I slipped on an unmarked wet floor at a grocery store and fell on my hip. There were no warning signs and several witnesses saw it happen.',
  'My motorcycle was sideswiped by a car that changed lanes without signaling. I was wearing a helmet but suffered a broken collarbone and road rash.',
  'I was a passenger in a rideshare when the driver ran a stop sign and we were hit. Both airbags deployed. I have a concussion and shoulder injury.',
  'A delivery truck backed into my parked car while I was loading groceries and then drove off. I got the plate number and there is security camera footage.',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomGclid(): string {
  return `Cj${Math.random().toString(36).slice(2, 10)}EAAYASAAEgK${Math.random().toString(36).slice(2, 6)}`
}

function randomPhone(): string {
  const area = Math.floor(Math.random() * 800) + 200
  const mid = Math.floor(Math.random() * 900) + 100
  const end = Math.floor(Math.random() * 9000) + 1000
  return `+1${area}${mid}${end}`
}

function randomWebhookId(): string {
  return `wh_${Math.random().toString(36).slice(2, 18)}`
}

function randomContactId(): string {
  return `cnt_${Math.random().toString(36).slice(2, 18)}`
}

export function generateMockGHLPayload(): GHLContactCreatePayload {
  const firstName = pick(FIRST_NAMES)
  const lastName = pick(LAST_NAMES)
  const accidentType = pick(ACCIDENT_TYPES)
  const accidentTiming = pick(ACCIDENT_TIMINGS)
  const utmSource = pick(UTM_SOURCES)
  const utmMedium = pick(UTM_MEDIUMS)
  const utmCampaign = pick(CAMPAIGNS)
  const useGclid = utmSource === 'google_ads'

  return {
    type: 'ContactCreate',
    timestamp: new Date().toISOString(),
    webhookId: randomWebhookId(),
    data: {
      id: randomContactId(),
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: randomPhone(),
      tags: ['pi-lead', accidentType.toLowerCase().replace(/\s+/g, '-')],
      source: utmSource,
      customField: {
        accidentType,
        accidentTiming,
        description: pick(DESCRIPTIONS),
      },
      attributionSource: {
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent: 'hero-form',
        utmTerm: accidentType.toLowerCase().replace(/\s+/g, '+'),
        gclid: useGclid ? randomGclid() : '',
      },
    },
  }
}
