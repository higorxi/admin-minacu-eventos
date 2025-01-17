'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface NewEventModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Ingresso {
  tipo: string
  preco: string
  descricao: string
}

interface Evento {
  nome: string
  tipo: string
  data: string
  horario: string
  local: string
  descricao: string
  imagens: string[]
  ingressos: Ingresso[]
  regras: string[]
  dicas: string[]
  localInfo: {
    nome: string
    capacidade: string
    estrutura: string[]
    acessibilidade: string
  }
}

const initialEventState: Evento = {
  nome: '',
  tipo: 'publico',
  data: '',
  horario: '',
  local: '',
  descricao: '',
  imagens: [],
  ingressos: [],
  regras: [],
  dicas: [],
  localInfo: {
    nome: '',
    capacidade: '',
    estrutura: [],
    acessibilidade: '',
  },
}

export function NewEventModal({ isOpen, onClose }: NewEventModalProps) {
  const [newEvent, setNewEvent] = useState<Evento>(initialEventState)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEvent({ ...newEvent, [name]: value })
  }

  const handleAddIngresso = () => {
    setNewEvent({
      ...newEvent,
      ingressos: [
        ...newEvent.ingressos,
        { tipo: '', preco: '', descricao: '' }
      ],
    })
  }

  const handleIngressoChange = (index: number, field: keyof Ingresso, value: string) => {
    const updatedIngressos = [...newEvent.ingressos]
    updatedIngressos[index][field] = value
    setNewEvent({ ...newEvent, ingressos: updatedIngressos })
  }

  const handleSubmit = () => {
    console.log('Novo Evento Criado:', newEvent)
    onClose()
    setNewEvent(initialEventState)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Evento</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="nome">Nome do Evento</Label>
            <Input id="nome" name="nome" value={newEvent.nome} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="tipo">Tipo</Label>
            <Input id="tipo" name="tipo" value={newEvent.tipo} onChange={handleInputChange} />
          </div>
          <div className="flex space-x-4">
            <div>
              <Label htmlFor="data">Data</Label>
              <Input id="data" name="data" type="date" value={newEvent.data} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="horario">Horário</Label>
              <Input id="horario" name="horario" type="time" value={newEvent.horario} onChange={handleInputChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="local">Local</Label>
            <Input id="local" name="local" value={newEvent.local} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea id="descricao" name="descricao" value={newEvent.descricao} onChange={handleInputChange} />
          </div>
          <div>
            <Label>Ingressos</Label>
            {newEvent.ingressos.map((ingresso, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  placeholder="Tipo"
                  value={ingresso.tipo}
                  onChange={(e) => handleIngressoChange(index, 'tipo', e.target.value)}
                />
                <Input
                  placeholder="Preço"
                  value={ingresso.preco}
                  onChange={(e) => handleIngressoChange(index, 'preco', e.target.value)}
                />
                <Input
                  placeholder="Descrição"
                  value={ingresso.descricao}
                  onChange={(e) => handleIngressoChange(index, 'descricao', e.target.value)}
                />
              </div>
            ))}
            <Button onClick={handleAddIngresso} className="mt-2">Adicionar Ingresso</Button>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="button" onClick={handleSubmit}>Criar Evento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
