"use client"

import { Home, Calendar, Ticket, Settings, CreditCard, BarChart, LogOut, Mail } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from './mode-toggle'

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Calendar, label: 'Eventos', href: '/eventos' },
  { icon: Ticket, label: 'Ingressos', href: '/ingressos' },
  { icon: BarChart, label: 'Relatórios', href: '/relatorios' },
  { icon: Mail, label: 'Marketing', href: '/marketing' },
  { icon: Settings, label: 'Configurações', href: '/configuracoes' },
  { icon: CreditCard, label: 'Pagamentos', href: '/pagamentos' },
]

const CompanyInfo = () => (
  <div className="mt-auto p-4 bg-secondary rounded-lg flex items-center space-x-4">
    <Avatar>
      <AvatarImage src="/company-logo.png" alt="Logo da Empresa" />
      <AvatarFallback>EC</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <p className="text-sm font-medium">Empresa de Eventos</p>
      <p className="text-xs text-muted-foreground">contato@empresa.com</p>
    </div>
    <Button variant="ghost" size="icon">
      <LogOut className="h-4 w-4" />
    </Button>
  </div>
)

export function AppSidebar() {
  const pathname = usePathname()

  if (pathname === '/auth') {
    return null
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold">Minaçu Eventos</h2>
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <CompanyInfo />
      <SidebarRail />
    </Sidebar>
  )
}
