'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import CookieConsent from '@/components/CookieConsent'
import ExternalLinkTracker from '@/components/ExternalLinkTracker'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnalyticsProvider>
          {children}
          <Toaster />
          <CookieConsent />
          <ExternalLinkTracker />
        </AnalyticsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}