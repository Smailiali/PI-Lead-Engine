import type { UTMParams } from '@/types/lead'

export function extractUTMFromURL(url: string): UTMParams {
  let searchParams: URLSearchParams

  try {
    // Handle both full URLs and just query strings
    if (url.startsWith('http')) {
      searchParams = new URL(url).searchParams
    } else {
      searchParams = new URLSearchParams(url.startsWith('?') ? url.slice(1) : url)
    }
  } catch {
    return {}
  }

  const result: UTMParams = {}

  const utmSource = searchParams.get('utm_source')
  const utmMedium = searchParams.get('utm_medium')
  const utmCampaign = searchParams.get('utm_campaign')
  const utmContent = searchParams.get('utm_content')
  const utmTerm = searchParams.get('utm_term')
  const gclid = searchParams.get('gclid')

  if (utmSource) result.utmSource = utmSource
  if (utmMedium) result.utmMedium = utmMedium
  if (utmCampaign) result.utmCampaign = utmCampaign
  if (utmContent) result.utmContent = utmContent
  if (utmTerm) result.utmTerm = utmTerm
  if (gclid) result.gclid = gclid

  return result
}

export function formatUTMForDisplay(params: UTMParams): string {
  if (!params.utmSource && !params.gclid) {
    return 'Direct / None'
  }

  const parts: string[] = []

  if (params.utmSource) parts.push(params.utmSource)
  if (params.utmMedium) parts.push(params.utmMedium)
  if (params.utmCampaign) parts.push(params.utmCampaign)

  if (params.gclid && !params.utmSource) {
    parts.push('google')
    parts.push('cpc')
    parts.push('(gclid)')
  }

  return parts.join(' / ')
}
