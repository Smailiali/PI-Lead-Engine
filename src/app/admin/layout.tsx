import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
  title: 'Admin | PI Lead Engine',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-admin-bg flex flex-col lg:flex-row font-sans">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-auto admin-scroll">
        {children}
      </main>
    </div>
  )
}
