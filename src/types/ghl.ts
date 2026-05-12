export interface GHLAttributionSource {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent: string
  utmTerm: string
  gclid: string
}

export interface GHLContactData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  tags: string[]
  source: string
  customField: Record<string, string>
  attributionSource: GHLAttributionSource
}

export interface GHLContactCreatePayload {
  type: 'ContactCreate'
  timestamp: string
  webhookId: string
  data: GHLContactData
}

export interface GHLFormSubmissionData {
  id: string
  contactId: string
  formId: string
  name: string
  fields: Record<string, string>
}

export interface GHLFormSubmissionPayload {
  type: 'FormSubmission'
  timestamp: string
  webhookId: string
  data: GHLFormSubmissionData
}

export type GHLWebhookEvent = GHLContactCreatePayload | GHLFormSubmissionPayload
