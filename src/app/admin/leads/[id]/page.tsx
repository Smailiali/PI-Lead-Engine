import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import LeadDetail from '@/components/admin/LeadDetail'

export const dynamic = 'force-dynamic'

interface LeadPageProps {
  params: { id: string }
}

export default async function LeadPage({ params }: LeadPageProps) {
  const lead = await prisma.lead
    .findUnique({
      where: { id: params.id },
      include: { webhookLogs: { orderBy: { createdAt: 'asc' } } },
    })
    .catch(() => null)

  if (!lead) notFound()

  return <LeadDetail lead={lead} />
}
