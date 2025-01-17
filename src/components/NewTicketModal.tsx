'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

// Tipos para as propriedades do componente
interface Event {
  id: number
  name: string
  isPrivate?: boolean
}

interface NewTicketModalProps {
  isOpen: boolean
  onClose: () => void
  onAddTicket: (ticket: Ticket) => void
  events: Event[]
}

// Tipo para o estado do ingresso
interface Ticket {
  eventId: number 
  type: string
  price: number
  available: number
  acceptedPaymentMethods: {
    creditCard: boolean
    debitCard: boolean
    bankTransfer: boolean
    cash: boolean
  }
}

export function NewTicketModal({ isOpen, onClose, onAddTicket, events }: NewTicketModalProps) {
  const initialTicketState: Ticket = {
    eventId: 0,
    type: '',
    price: 0,
    available: 0,
    acceptedPaymentMethods: {
      creditCard: true,
      debitCard: true,
      bankTransfer: false,
      cash: false,
    },
  }

  const [newTicket, setNewTicket] = useState<Ticket>(initialTicketState)
  const [step, setStep] = useState<number>(1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTicket({ ...newTicket, [name]: value })
  }

  const handleSelectChange = (name: keyof Ticket) => (value: string) => {
    setNewTicket({ ...newTicket, [name]: value })
  }

  const handleSwitchChange = (method: keyof Ticket['acceptedPaymentMethods']) => {
    setNewTicket({
      ...newTicket,
      acceptedPaymentMethods: {
        ...newTicket.acceptedPaymentMethods,
        [method]: !newTicket.acceptedPaymentMethods[method],
      },
    })
  }

  const validateStep1 = (): boolean => {
    if (!newTicket.eventId || !newTicket.type || !newTicket.price || !newTicket.available) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return false
    }
    return true
  }

  const handleSubmit = () => {
    onAddTicket({
      ...newTicket,
      eventId: newTicket.eventId,
      price: newTicket.price,
      available: newTicket.available,
    })
    onClose()
    setStep(1)
    setNewTicket(initialTicketState)
  }

  const selectedEvent = events.find(event => event.id === newTicket.eventId)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Ingresso</DialogTitle>
        </DialogHeader>
        {step === 1 && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event" className="text-right">
                Evento
              </Label>
              <Select onValueChange={handleSelectChange('eventId')} value={newTicket.eventId?.toString()}>
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
              <Input id="type" name="type" value={newTicket.type} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Preço
              </Label>
              <Input id="price" name="price" type="number" value={newTicket.price} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="available" className="text-right">
                Quantidade
              </Label>
              <Input id="available" name="available" type="number" value={newTicket.available} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Métodos de Pagamento
              </Label>
              <div className="col-span-3 space-y-2">
                {['creditCard', 'debitCard', 'bankTransfer', 'cash'].map((method) => (
                  <div className="flex items-center justify-between" key={method}>
                    <Label htmlFor={method}>{method === 'creditCard' ? 'Cartão de Crédito' : method === 'debitCard' ? 'Cartão de Débito' : method === 'bankTransfer' ? 'Transferência Bancária' : 'Dinheiro'}</Label>
                    <Switch
                      id={method}
                      checked={newTicket.acceptedPaymentMethods[method as keyof Ticket['acceptedPaymentMethods']]}
                      onCheckedChange={() => handleSwitchChange(method as keyof Ticket['acceptedPaymentMethods'])}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="py-4">
            <h3 className="mb-4 text-lg font-medium">Revisão do Ingresso</h3>
            <p>Evento: {selectedEvent?.name || 'Evento não encontrado'}</p>
            <p>Tipo: {newTicket.type}</p>
            <p>Preço: R$ {newTicket.price.toFixed(2)}</p>
            <p>Quantidade: {newTicket.available}</p>
            <p>Métodos de Pagamento Aceitos:</p>
            <ul className="list-disc pl-5">
              {Object.entries(newTicket.acceptedPaymentMethods).map(([method, accepted]) =>
                accepted && <li key={method}>{method}</li>
              )}
            </ul>
            {selectedEvent?.isPrivate && (
              <p className="mt-4 text-yellow-600">Este é um evento privado. Os ingressos não serão visíveis publicamente.</p>
            )}
          </div>
        )}
        <DialogFooter>
          {step === 1 ? (
            <Button type="button" onClick={() => validateStep1() && setStep(2)}>Revisar</Button>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={() => setStep(1)}>Voltar</Button>
              <Button type="button" onClick={handleSubmit}>Confirmar</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
