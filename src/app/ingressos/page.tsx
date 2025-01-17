'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NewTicketModal } from '@/components/NewTicketModal'
import { EditTicketModal } from '@/components/EditTicketModal'

interface Event {
  id: number
  name: string
  isPrivate: boolean
}

interface PaymentMethods {
  creditCard: boolean
  debitCard: boolean
  bankTransfer: boolean
  cash: boolean
}

interface Ticket {
  id: number
  eventId: number
  type: string
  price: number
  available: number
  acceptedPaymentMethods: PaymentMethods
}

const events: Event[] = [
  { id: 1, name: 'Festa de Aniversário', isPrivate: true },
  { id: 2, name: 'Conferência Tech', isPrivate: false },
  { id: 3, name: 'Show de Rock', isPrivate: false },
]

const initialTickets: Ticket[] = [
  { id: 1, eventId: 1, type: 'VIP', price: 100, available: 20, acceptedPaymentMethods: { creditCard: true, debitCard: true, bankTransfer: false, cash: true } },
  { id: 2, eventId: 1, type: 'Regular', price: 50, available: 50, acceptedPaymentMethods: { creditCard: true, debitCard: true, bankTransfer: false, cash: true } },
  { id: 3, eventId: 2, type: 'Early Bird', price: 80, available: 100, acceptedPaymentMethods: { creditCard: true, debitCard: true, bankTransfer: true, cash: false } },
  { id: 4, eventId: 2, type: 'Regular', price: 100, available: 200, acceptedPaymentMethods: { creditCard: true, debitCard: true, bankTransfer: true, cash: false } },
  { id: 5, eventId: 3, type: 'Pista', price: 80, available: 200, acceptedPaymentMethods: { creditCard: true, debitCard: true, bankTransfer: true, cash: true } },
  { id: 6, eventId: 3, type: 'Camarote', price: 150, available: 50, acceptedPaymentMethods: { creditCard: true, debitCard: true, bankTransfer: true, cash: false } },
]

export default function IngressosPage() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState<boolean>(false)
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)

  const filteredTickets = selectedEventId
    ? tickets.filter(ticket => ticket.eventId === selectedEventId)
    : tickets

  const handleAddTicket = (newTicket: Omit<Ticket, 'id'>) => {
    setTickets([...tickets, { ...newTicket, id: tickets.length + 1 }])
  }

  const handleEditTicket = (editedTicket: Ticket) => {
    setTickets(tickets.map(ticket => ticket.id === editedTicket.id ? editedTicket : ticket))
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between ">
          <div className="flex items-center justify-between space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Ingressos</h1>
          </div>
          <Button onClick={() => setIsNewTicketModalOpen(true)}>Novo Ingresso</Button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <Select onValueChange={(value) => setSelectedEventId(Number(value))}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Selecione um evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Todos os eventos</SelectItem>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id.toString()}>{event.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Disponíveis</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{events.find(e => e.id === ticket.eventId)?.name}</TableCell>
                  <TableCell>{ticket.type}</TableCell>
                  <TableCell>R$ {ticket.price.toFixed(2)}</TableCell>
                  <TableCell>{ticket.available}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => setEditingTicket(ticket)}>Editar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <NewTicketModal 
        isOpen={isNewTicketModalOpen} 
        onClose={() => setIsNewTicketModalOpen(false)} 
        onAddTicket={handleAddTicket}
        events={events}
      />
      {editingTicket && (
        <EditTicketModal
          isOpen={!!editingTicket}
          onClose={() => setEditingTicket(null)}
          onEditTicket={handleEditTicket}
          ticket={editingTicket}
          events={events}
        />
      )}
    </div>
  )
}
