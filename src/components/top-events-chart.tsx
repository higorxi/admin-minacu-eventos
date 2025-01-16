"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Evento A', vendas: 4000 },
  { name: 'Evento B', vendas: 3000 },
  { name: 'Evento C', vendas: 2000 },
  { name: 'Evento D', vendas: 2780 },
  { name: 'Evento E', vendas: 1890 },
]

export function TopEventsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Bar dataKey="vendas" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

