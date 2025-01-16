import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const tickets = [
  { id: 1, event: 'Festa de Aniversário', type: 'VIP', price: 100, available: 20 },
  { id: 2, event: 'Conferência Tech', type: 'Regular', price: 50, available: 50 },
  { id: 3, event: 'Show de Rock', type: 'Pista', price: 80, available: 200 },
]

export default function IngressosPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <h1 className="ml-4 text-xl font-semibold">Ingressos</h1>
          </div>
          <Button>Novo Ingresso</Button>
        </div>
        <div className="p-4">
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
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.event}</TableCell>
                  <TableCell>{ticket.type}</TableCell>
                  <TableCell>R$ {ticket.price.toFixed(2)}</TableCell>
                  <TableCell>{ticket.available}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Editar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

