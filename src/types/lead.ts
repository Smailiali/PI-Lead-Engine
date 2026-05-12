export interface LeadFormData {
  firstName: string
  lastName: string
  phone: string
  email?: string
  accidentType: string
  accidentTiming: string
  description: string
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'signed' | 'rejected'

export interface UTMParams {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  gclid?: string
}

export interface LeadWithScreening {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string | null
  accidentType: string
  accidentTiming: string
  description: string
  status: LeadStatus

  // Attribution
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmContent: string | null
  utmTerm: string | null
  gclid: string | null
  landingPage: string | null
  referrer: string | null

  // AI Screening
  aiScore: number | null
  aiCaseType: string | null
  aiViability: string | null
  aiValueRange: string | null
  aiUrgency: string | null
  aiRedFlags: string | null
  aiRecommendation: string | null
  aiScreenedAt: Date | null

  // GHL
  ghlContactId: string | null
  ghlSource: string | null

  createdAt: Date
  updatedAt: Date

  webhookLogs?: WebhookLogEntry[]
}

export interface WebhookLogEntry {
  id: string
  source: string
  eventType: string
  payload: string
  status: string
  errorMessage: string | null
  processingTime: number | null
  leadId: string | null
  createdAt: Date
}

export interface LeadSummaryStats {
  totalLeads: number
  leadsThisWeek: number
  avgAiScore: number | null
  leadsBySource: Record<string, number>
  leadsByStatus: Record<LeadStatus, number>
  topSource: string | null
}
