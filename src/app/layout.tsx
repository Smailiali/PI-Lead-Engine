import type { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Deldar Legal | Personal Injury Attorneys',
    template: '%s | Deldar Legal',
  },
  description:
    'Injured in an accident? Deldar Legal fights for maximum compensation. Free case review. No fees unless we win. Call now or submit your case online.',
  keywords: [
    'personal injury attorney',
    'car accident lawyer',
    'free case review',
    'no fee unless we win',
    'personal injury lawyer',
    'accident attorney',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Deldar Legal',
    title: 'Deldar Legal | Personal Injury Attorneys',
    description:
      'Injured in an accident? Deldar Legal fights for maximum compensation. Free case review. No fees unless we win.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deldar Legal | Personal Injury Attorneys',
    description:
      'Injured in an accident? Deldar Legal fights for maximum compensation. Free case review. No fees unless we win.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
