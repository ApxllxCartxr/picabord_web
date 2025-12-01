import type { Metadata } from 'next'
import { Outfit, DM_Sans } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { Toaster } from '@/components/ui/toaster'
// Client component for navigation
import ClientLayout from './client-layout'
import PageTransition from '@/components/PageTransition'
import FloatingThemeToggle from '@/components/FloatingThemeToggle'
import SmoothScroll from '@/components/SmoothScroll'

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-heading'
})

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-body'
})

export const metadata: Metadata = {
    title: 'PICABORD',
    description: 'Discover PICABORD\'s flagship PIKA1 product and cutting-edge TEC division. Leading innovation in advanced technology solutions.',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fira+Code:wght@300..700&family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400..700;1,400..700&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Outfit:wght@100..900&family=Oxanium:wght@200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,opsz,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
                    rel="stylesheet"
                />
                {/* Favicon */}
                <link rel="icon" href="/PIC-A-BOARD_logo_w.png" />
                <link rel="apple-touch-icon" href="/PIC-A-BOARD_logo_w.png" />
            </head>
                    <body className={`${dmSans.variable} ${outfit.variable} font-body`}>
                        <FloatingThemeToggle />
                        <Providers>
                            <ClientLayout>
                                <SmoothScroll>
                                    <div className="min-h-screen bg-background text-foreground">
                                        <PageTransition />
                                        {children}
                                    </div>
                                </SmoothScroll>
                            </ClientLayout>
                            <Toaster />
                </Providers>
            </body>
        </html>
    )
}