"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', taxa: 95 },
  { name: 'Fev', taxa: 98 },
  { name: 'Mar', taxa: 97 },
  { name: 'Abr', taxa: 99 },
  { name: 'Mai', taxa: 96 },
  { name: 'Jun', taxa: 98 },
  { name: 'Jul', taxa: 97 },
]

export function SuccessRateChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="taxa" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

