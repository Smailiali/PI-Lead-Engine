interface AttributionCardProps {
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmContent: string | null
  utmTerm: string | null
  gclid: string | null
  landingPage: string | null
  referrer: string | null
  ghlContactId: string | null
  ghlSource: string | null
}

function Row({ label, value }: { label: string; value: string | null }) {
  const display = value ?? null
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-admin-border last:border-0">
      <p className="font-sans text-xs text-admin-muted uppercase tracking-wider flex-shrink-0 pt-0.5 w-28">
        {label}
      </p>
      {display ? (
        <p className="font-sans text-sm text-admin-text text-right break-all">{display}</p>
      ) : (
        <p className="font-sans text-sm text-admin-muted italic text-right">Direct / None</p>
      )}
    </div>
  )
}

export default function AttributionCard({
  utmSource,
  utmMedium,
  utmCampaign,
  utmContent,
  utmTerm,
  gclid,
  landingPage,
  referrer,
  ghlContactId,
  ghlSource,
}: AttributionCardProps) {
  return (
    <div className="bg-admin-card border border-admin-border rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-admin-border">
        <p className="font-sans text-sm font-semibold text-admin-text">Attribution</p>
      </div>

      <div className="px-6 py-1">
        <Row label="Source" value={utmSource} />
        <Row label="Medium" value={utmMedium} />
        <Row label="Campaign" value={utmCampaign} />
        <Row label="Content" value={utmContent} />
        <Row label="Term" value={utmTerm} />
        <Row label="GCLID" value={gclid} />
        <Row label="Landing Page" value={landingPage} />
        <Row label="Referrer" value={referrer} />
      </div>

      {(ghlContactId || ghlSource) && (
        <>
          <div className="px-6 py-3 border-t border-admin-border bg-white/[0.02]">
            <p className="font-sans text-xs text-admin-muted uppercase tracking-wider">GHL Data</p>
          </div>
          <div className="px-6 py-1">
            <Row label="Contact ID" value={ghlContactId} />
            <Row label="GHL Source" value={ghlSource} />
          </div>
        </>
      )}
    </div>
  )
}
