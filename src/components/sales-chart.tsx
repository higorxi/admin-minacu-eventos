"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Festa de Aniversário", vendas: 4000 },
  { name: "Conferência Tech", vendas: 3000 },
  { name: "Show de Rock", vendas: 2000 },
  { name: "Workshop de Arte", vendas: 2780 },
  { name: "Festival de Comida", vendas: 1890 },
  { name: "Corrida Beneficente", vendas: 2390 },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <Tooltip />
        <Bar dataKey="vendas" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

