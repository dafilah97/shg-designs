import type { Metadata } from 'next'
import Sidebar from '@/components/admin/Sidebar'

export const metadata: Metadata = {
  title: 'SHG Designs — Admin Panel',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-charcoal-950 flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto lg:p-8 p-4 pt-20 lg:pt-8">
        {children}
      </main>
    </div>
  )
}
