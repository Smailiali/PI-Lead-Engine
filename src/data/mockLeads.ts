import { prisma } from '@/lib/prisma'

interface LeadSeed {
  firstName: string
  lastName: string
  phone: string
  email?: string
  accidentType: string
  accidentTiming: string
  description: string
  status: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  gclid?: string
  ghlContactId?: string
  ghlSource?: string
  aiScore: number
  aiCaseType: string
  aiViability: string
  aiValueRange: string
  aiUrgency: string
  aiRedFlags: string[]
  aiRecommendation: string
}

const LEADS: LeadSeed[] = [
  {
    firstName: 'Maria',
    lastName: 'Rodriguez',
    phone: '(213) 555-0142',
    email: 'maria.rodriguez@gmail.com',
    accidentType: 'Car Accident',
    accidentTiming: 'This week',
    description:
      'I was stopped at a red light on the 405 freeway when a driver rear-ended me at high speed. My car was totaled. I went to the ER the same day with severe neck pain, back pain, and a possible concussion. I have imaging from Cedars-Sinai and a police report. The other driver was cited.',
    status: 'qualified',
    utmSource: 'google_ads',
    utmMedium: 'cpc',
    utmCampaign: 'la-car-accident',
    utmContent: 'hero-form',
    utmTerm: 'car+accident+lawyer+los+angeles',
    gclid: 'CjwKCAjw5ImwBhBtEiwAFHDZxxR7g3Q',
    aiScore: 9,
    aiCaseType: 'Motor Vehicle Accident',
    aiViability: 'Strong',
    aiValueRange: '$150K-$500K',
    aiUrgency: 'High',
    aiRedFlags: [],
    aiRecommendation:
      'Exceptionally strong case. Client has ER documentation, police report, and clear liability. Schedule intake call within 24 hours. Request all medical records and the police report immediately.',
  },
  {
    firstName: 'James',
    lastName: 'Thompson',
    phone: '(310) 555-0187',
    accidentType: 'Truck Accident',
    accidentTiming: 'This week',
    description:
      'A FedEx semi-truck ran a red light at a commercial intersection and T-boned my vehicle on the driver side. Both airbags deployed. I was taken by ambulance to UCLA Medical Center. I have a fractured rib, a broken collarbone, and a moderate TBI. The truck had a dashcam and there were multiple witnesses.',
    status: 'contacted',
    utmSource: 'google_ads',
    utmMedium: 'cpc',
    utmCampaign: 'truck-accident-brand',
    utmContent: 'hero-form',
    utmTerm: 'truck+accident+attorney',
    gclid: 'CjwKCAjw5ImwBhBtEiwAFHDZyyS8h4R9',
    aiScore: 10,
    aiCaseType: 'Commercial Truck Accident',
    aiViability: 'Strong',
    aiValueRange: '$500K+',
    aiUrgency: 'High',
    aiRedFlags: [],
    aiRecommendation:
      'Maximum priority. Commercial truck accident with serious documented injuries, dashcam footage, and multiple witnesses. High-value case against a corporation with deep pockets. Assign senior attorney immediately and file a preservation letter for the dashcam footage today.',
  },
  {
    firstName: 'Sandra',
    lastName: 'Kim',
    phone: '(424) 555-0063',
    email: 'sandrakim@outlook.com',
    accidentType: 'Slip & Fall',
    accidentTiming: 'This month',
    description:
      'I slipped on an unmarked wet floor at a Ralphs grocery store in Westwood. There were no wet floor signs anywhere near the spill. I fell on my hip and right wrist. Three other customers witnessed it and the store manager called 911. I have a fractured wrist requiring surgery and a bruised hip. I have the incident report.',
    status: 'qualified',
    utmSource: 'google_ads',
    utmMedium: 'cpc',
    utmCampaign: 'slip-fall-retarget',
    utmContent: 'practice-areas-card',
    utmTerm: 'slip+and+fall+attorney',
    aiScore: 8,
    aiCaseType: 'Premises Liability - Slip & Fall',
    aiViability: 'Strong',
    aiValueRange: '$50K-$150K',
    aiUrgency: 'High',
    aiRedFlags: ['Comparative negligence possible if client was wearing inappropriate footwear'],
    aiRecommendation:
      'Strong premises liability case. Incident report, witnesses, and documented injury strengthen the claim. Obtain security camera footage immediately before it is overwritten. Schedule intake call within 48 hours.',
  },
  {
    firstName: 'Robert',
    lastName: 'Martinez',
    phone: '(562) 555-0229',
    accidentType: 'Car Accident',
    accidentTiming: 'This month',
    description:
      'Another driver sideswiped my vehicle on the 101 freeway while merging without signaling. I have whiplash and lower back pain. I saw a chiropractor twice but have not been to a hospital. The other driver admitted fault at the scene but their insurance is denying my claim.',
    status: 'new',
    utmSource: 'facebook',
    utmMedium: 'social',
    utmCampaign: 'westwood-pi',
    utmContent: 'video-ad',
    aiScore: 6,
    aiCaseType: 'Motor Vehicle Accident',
    aiViability: 'Moderate',
    aiValueRange: '$10K-$50K',
    aiUrgency: 'Medium',
    aiRedFlags: [
      'No ER visit — only chiropractic treatment weakens injury documentation',
      'Insurance denial may indicate liability dispute',
    ],
    aiRecommendation:
      'Moderate case. Verbal admission of fault is helpful but needs documentation. Strongly advise client to get an MRI immediately. Request the police report and any dashcam footage. Case value will depend heavily on medical documentation obtained going forward.',
  },
  {
    firstName: 'Patricia',
    lastName: 'Wilson',
    phone: '(714) 555-0091',
    email: 'pwilson@yahoo.com',
    accidentType: 'Car Accident',
    accidentTiming: '1-3 months ago',
    description:
      'I was a passenger in a Lyft when the driver ran a stop sign and we were hit by another vehicle. Both drivers were at fault. I have a concussion, a herniated disc at L4-L5, and I have been in physical therapy for 8 weeks. I have all medical records and the Lyft trip receipt.',
    status: 'signed',
    utmSource: 'referral',
    utmMedium: 'organic',
    utmCampaign: 'la-car-accident',
    aiScore: 9,
    aiCaseType: 'Rideshare Passenger Injury',
    aiViability: 'Strong',
    aiValueRange: '$150K-$500K',
    aiUrgency: 'High',
    aiRedFlags: [],
    aiRecommendation:
      'Excellent case with multiple liable parties — both the Lyft driver and the other driver. Lyft carries $1M commercial insurance for passenger injuries. Eight weeks of documented PT and a herniated disc significantly increase case value. Priority sign.',
  },
  {
    firstName: 'David',
    lastName: 'Chen',
    phone: '(626) 555-0154',
    accidentType: 'Motorcycle Accident',
    accidentTiming: '1-3 months ago',
    description:
      'A car changed lanes without signaling and forced me off the road on the 10 freeway. I was wearing full gear but still suffered road rash on my arms and legs, a broken ankle, and a shoulder separation. I spent two days in the hospital. The other driver fled the scene but a witness got their plate number.',
    status: 'contacted',
    utmSource: 'google_ads',
    utmMedium: 'cpc',
    utmCampaign: 'motorcycle-injury-la',
    utmContent: 'hero-form',
    utmTerm: 'motorcycle+accident+lawyer',
    gclid: 'CjwKCAjw5ImwBhBtEiwAFHDZzzT9i5S1',
    aiScore: 7,
    aiCaseType: 'Motorcycle Accident',
    aiViability: 'Moderate',
    aiValueRange: '$50K-$150K',
    aiUrgency: 'Medium',
    aiRedFlags: [
      'Hit and run complicates recovery — may require uninsured motorist claim',
      'Insurance companies often apply comparative negligence to motorcyclists',
    ],
    aiRecommendation:
      'Good case with documented injuries and a witness. File uninsured motorist claim with client\'s own insurer immediately. Obtain witness statement and attempt to trace the plate number. Prepare for comparative fault argument from opposing counsel.',
  },
  {
    firstName: 'Linda',
    lastName: 'Patel',
    phone: '(818) 555-0033',
    email: 'linda.patel@icloud.com',
    accidentType: 'Slip & Fall',
    accidentTiming: 'More than 3 months ago',
    description:
      'I tripped on a broken sidewalk in front of a commercial property in Burbank about 5 months ago. I hurt my knee and have been having pain since. I did not see a doctor right away because I thought it would heal on its own. I finally got an MRI last week that shows a torn meniscus.',
    status: 'new',
    utmSource: 'facebook',
    utmMedium: 'social',
    utmCampaign: 'slip-fall-retarget',
    utmContent: 'carousel-ad',
    aiScore: 4,
    aiCaseType: 'Premises Liability - Trip & Fall',
    aiViability: 'Weak',
    aiValueRange: '$10K-$50K',
    aiUrgency: 'Low',
    aiRedFlags: [
      'Significant gap in treatment — 5 months without seeing a doctor severely undermines injury causation',
      'Defense will argue the injury predates or is unrelated to the fall',
      'Must investigate statute of limitations — 2-year California limit',
      'No incident report or witnesses documented',
    ],
    aiRecommendation:
      'Challenging case due to the treatment gap. Viability depends on whether the torn meniscus can be causally linked to the fall through medical expert testimony. Needs further evaluation before commitment. Check statute of limitations carefully.',
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    phone: '(323) 555-0178',
    accidentType: 'Car Accident',
    accidentTiming: 'This week',
    description:
      'I was driving through an intersection on a green light when someone ran a red and hit me on the passenger side. My car deployed the airbags. I went to urgent care with a headache and neck stiffness. I have the police report and photos of both vehicles. The other driver was issued a citation.',
    status: 'new',
    utmSource: 'google_ads',
    utmMedium: 'cpc',
    utmCampaign: 'la-car-accident',
    utmContent: 'hero-form',
    utmTerm: 'car+accident+injury+attorney',
    gclid: 'CjwKCAjw5ImwBhBtEiwAFHDZaaU2j6T0',
    aiScore: 7,
    aiCaseType: 'Motor Vehicle Accident',
    aiViability: 'Moderate',
    aiValueRange: '$10K-$50K',
    aiUrgency: 'High',
    aiRedFlags: ['Only urgent care visit so far — needs hospital-level imaging to confirm injuries'],
    aiRecommendation:
      'Good liability facts with police report and citation. Case value will depend on injury documentation. Advise client to get an MRI and follow up with a specialist immediately. Strong liability, needs stronger injury proof.',
  },
  {
    firstName: 'Angela',
    lastName: 'Foster',
    phone: '(949) 555-0066',
    email: 'angela.foster@gmail.com',
    accidentType: 'Wrongful Death',
    accidentTiming: '1-3 months ago',
    description:
      'My husband was killed by a drunk driver who ran a red light two months ago. The driver had a BAC of 0.19 and had three prior DUI convictions. My husband was the sole provider for our family of four. We have the police report, the coroner\'s report, toxicology results, and his DMV record.',
    status: 'signed',
    utmSource: 'referral',
    utmMedium: 'organic',
    utmCampaign: 'la-car-accident',
    aiScore: 10,
    aiCaseType: 'Wrongful Death - DUI',
    aiViability: 'Strong',
    aiValueRange: '$500K+',
    aiUrgency: 'High',
    aiRedFlags: [],
    aiRecommendation:
      'Maximum priority wrongful death case. Drunk driver with prior DUI convictions creates punitive damages exposure. Loss of financial support for four dependents significantly increases economic damages. This is an 8-figure case potential. Assign your most senior wrongful death attorney immediately.',
  },
  {
    firstName: 'Kevin',
    lastName: 'Brooks',
    phone: '(760) 555-0211',
    accidentType: 'Car Accident',
    accidentTiming: 'More than 3 months ago',
    description:
      'I was in a fender bender about 8 months ago. The other driver tapped my bumper in a parking lot. I have some occasional neck stiffness that I believe is from the accident. I did not call the police or go to the doctor at the time.',
    status: 'rejected',
    utmSource: 'facebook',
    utmMedium: 'social',
    utmCampaign: 'westwood-pi',
    utmContent: 'boost-post',
    aiScore: 2,
    aiCaseType: 'Minor Motor Vehicle Accident',
    aiViability: 'Weak',
    aiValueRange: '$10K-$50K',
    aiUrgency: 'Low',
    aiRedFlags: [
      'Low-speed parking lot collision — minimal property damage',
      'No police report filed',
      'No medical treatment obtained at any point',
      '8 months elapsed — statute of limitations concern and severe causation issues',
      'Vague symptoms with no documentation',
    ],
    aiRecommendation:
      'Case is not viable. No documentation, no medical records, 8-month gap, and low-impact collision make it extremely difficult to establish damages or causation. Politely decline representation.',
  },
]

export async function seedDemoData(): Promise<{ created: number; skipped: number }> {
  // Check if data already exists to prevent duplicate seeding
  const existing = await prisma.lead.count()
  if (existing >= 5) {
    return { created: 0, skipped: existing }
  }

  let created = 0

  for (const seed of LEADS) {
    const screenedAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    const createdAt = new Date(screenedAt.getTime() - Math.random() * 60 * 1000)
    const processingTime = Math.floor(Math.random() * 4000) + 800

    const lead = await prisma.lead.create({
      data: {
        firstName: seed.firstName,
        lastName: seed.lastName,
        phone: seed.phone,
        email: seed.email ?? null,
        accidentType: seed.accidentType,
        accidentTiming: seed.accidentTiming,
        description: seed.description,
        status: seed.status,
        utmSource: seed.utmSource ?? null,
        utmMedium: seed.utmMedium ?? null,
        utmCampaign: seed.utmCampaign ?? null,
        utmContent: seed.utmContent ?? null,
        utmTerm: seed.utmTerm ?? null,
        gclid: seed.gclid ?? null,
        ghlContactId: seed.ghlContactId ?? null,
        ghlSource: seed.ghlSource ?? null,
        aiScore: seed.aiScore,
        aiCaseType: seed.aiCaseType,
        aiViability: seed.aiViability,
        aiValueRange: seed.aiValueRange,
        aiUrgency: seed.aiUrgency,
        aiRedFlags: JSON.stringify(seed.aiRedFlags),
        aiRecommendation: seed.aiRecommendation,
        aiScreenedAt: screenedAt,
        createdAt,
        updatedAt: screenedAt,
      },
    })

    // Create webhook logs for each lead
    const source = seed.ghlContactId ? 'ghl' : 'form'
    const payload = JSON.stringify({
      formData: {
        firstName: seed.firstName,
        lastName: seed.lastName,
        phone: seed.phone,
        accidentType: seed.accidentType,
        accidentTiming: seed.accidentTiming,
        description: seed.description,
      },
      utmParams: {
        utmSource: seed.utmSource,
        utmMedium: seed.utmMedium,
        utmCampaign: seed.utmCampaign,
      },
      leadId: lead.id,
    })

    await prisma.webhookLog.createMany({
      data: [
        {
          source,
          eventType: source === 'ghl' ? 'ContactCreate' : 'FormSubmission',
          payload,
          status: 'stored',
          processingTime,
          leadId: lead.id,
          createdAt,
        },
      ],
    })

    created++
  }

  return { created, skipped: 0 }
}
