import { prisma } from '@/lib/prisma'
import WebhookLogTable from '@/components/admin/WebhookLogTable'
import GHLSimulatorButton from '@/components/admin/GHLSimulatorButton'

export const dynamic = 'force-dynamic'

export default async function WebhookLogPage() {
  const logs = await prisma.webhookLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  const errorCount = logs.filter((l) => l.status === 'error').length
  const storedCount = logs.filter((l) => l.status === 'stored').length

  return (
    <div className="px-6 lg:px-10 py-8 flex flex-col gap-8">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        <div>
          <h1 className="font-sans text-2xl font-bold text-admin-text">Webhook Log</h1>
          <p className="font-sans text-sm text-admin-muted mt-1">
            All incoming webhook events: form submissions, GHL contacts, and simulated payloads.
          </p>

          {/* Quick stats */}
          <div className="flex items-center gap-5 mt-4">
            <div className="flex flex-col">
              <span className="font-sans text-xl font-bold text-admin-text">{logs.length}</span>
              <span className="font-sans text-xs text-admin-muted uppercase tracking-wider">Total Events</span>
            </div>
            <div className="w-px h-8 bg-admin-border" />
            <div className="flex flex-col">
              <span className="font-sans text-xl font-bold text-admin-green">{storedCount}</span>
              <span className="font-sans text-xs text-admin-muted uppercase tracking-wider">Stored</span>
            </div>
            <div className="w-px h-8 bg-admin-border" />
            <div className="flex flex-col">
              <span className={`font-sans text-xl font-bold ${errorCount > 0 ? 'text-admin-red' : 'text-admin-muted'}`}>
                {errorCount}
              </span>
              <span className="font-sans text-xs text-admin-muted uppercase tracking-wider">Errors</span>
            </div>
          </div>
        </div>

        {/* Simulator */}
        <div className="flex-shrink-0">
          <p className="font-sans text-xs text-admin-muted uppercase tracking-wider mb-2">
            GHL Simulator
          </p>
          <GHLSimulatorButton />
        </div>
      </div>

      {/* Log table */}
      <WebhookLogTable logs={logs} />
    </div>
  )
}
