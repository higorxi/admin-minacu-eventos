"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SalesChart } from '@/components/sales-chart'
import { PaymentMethodsChart } from '@/components/payment-methods-chart'
import { SuccessRateChart } from '@/components/success-rate-chart'
import { TopEventsChart } from '@/components/top-events-chart'
import { DatePickerWithRange } from '@/components/date-range-picker'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { DateRange } from 'react-day-picker'

export default function RelatoriosPage() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <div className="flex items-center space-x-2">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>
      <Tabs defaultValue="vendas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
          <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
          <TabsTrigger value="eventos">Eventos</TabsTrigger>
        </TabsList>
        <TabsContent value="vendas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vendas por Evento</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top 5 Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <TopEventsChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="pagamentos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentMethodsChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Sucesso de Pagamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <SuccessRateChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="eventos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Eventos Mais Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <TopEventsChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Vendas por Evento</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

