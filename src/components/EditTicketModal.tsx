"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface Event {
  id: number
  name: string
}

interface AcceptedPaymentMethods {
  creditCard: boolean
  debitCard: boolean
  bankTransfer: boolean
  cash: boolean
}

interface Ticket {
  id: number
  type: string
  price: number
  available: number
  eventId: number
  acceptedPaymentMethods: AcceptedPaymentMethods
}

interface EditTicketModalProps {
  isOpen: boolean
  onClose: () => void
  onEditTicket: (updatedTicket: Ticket) => void
  ticket: Ticket
  events: Event[]
}

export function EditTicketModal({ isOpen, onClose, onEditTicket, ticket, events }: EditTicketModalProps) {
  const [editedTicket, setEditedTicket] = useState<Ticket>(ticket)

  useEffect(() => {
    setEditedTicket(ticket)
  }, [ticket])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedTicket({ ...editedTicket, [name]: value })
  }

  const handleSelectChange = (name: keyof Ticket) => (value: string) => {
    setEditedTicket({ ...editedTicket, [name]: parseInt(value) })
  }

  const handleSwitchChange = (method: keyof AcceptedPaymentMethods) => {
    setEditedTicket((prev) => ({
      ...prev,
      acceptedPaymentMethods: {
        ...prev.acceptedPaymentMethods,
        [method]: !prev.acceptedPaymentMethods[method],
      },
    }))
  }

  const handleSubmit = () => {
    onEditTicket({
      ...editedTicket,
      price: parseFloat(editedTicket.price.toString()),
      available: parseInt(editedTicket.available.toString()),
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Ingresso</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event" className="text-right">
              Evento
            </Label>
            <Select onValueChange={handleSelectChange('eventId')} value={editedTicket.eventId.toString()}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Selecione um evento" />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id.toString()}>{event.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tipo
            </Label>
            <Input id="type" name="type" value={editedTicket.type} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Preço
            </Label>
            <Input id="price" name="price" type="number" value={editedTicket.price} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="available" className="text-right">
              Quantidade
            </Label>
            <Input id="available" name="available" type="number" value={editedTicket.available} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Métodos de Pagamento
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="creditCard">Cartão de Crédito</Label>
                <Switch
                  id="creditCard"
                  checked={editedTicket.acceptedPaymentMethods.creditCard}
                  onCheckedChange={() => handleSwitchChange('creditCard')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="debitCard">Cartão de Débito</Label>
                <Switch
                  id="debitCard"
                  checked={editedTicket.acceptedPaymentMethods.debitCard}
                  onCheckedChange={() => handleSwitchChange('debitCard')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="bankTransfer">Transferência Bancária</Label>
                <Switch
                  id="bankTransfer"
                  checked={editedTicket.acceptedPaymentMethods.bankTransfer}
                  onCheckedChange={() => handleSwitchChange('bankTransfer')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="cash">Dinheiro</Label>
                <Switch
                  id="cash"
                  checked={editedTicket.acceptedPaymentMethods.cash}
                  onCheckedChange={() => handleSwitchChange('cash')}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
