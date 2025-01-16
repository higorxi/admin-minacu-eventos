import { Inter } from 'next/font/google'
import { SidebarProvider } from '@/components/ui/sidebar'

import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { AppSidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistema de Gerenciamento de Eventos',
  description: 'Controle seus eventos, ingressos e pagamentos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex h-screen overflow-hidden">
            <SidebarProvider>
              <AppSidebar />
              <div className="flex-1 overflow-auto">
                {children}
              </div>
            </SidebarProvider>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

