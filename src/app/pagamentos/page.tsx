import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const payments = [
  { id: 1, date: '2023-07-01', amount: 1999.00, status: 'Concluído' },
  { id: 2, date: '2023-07-05', amount: 39.00, status: 'Processando' },
  { id: 3, date: '2023-07-10', amount: 299.00, status: 'Concluído' },
]

export default function PagamentosPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <h1 className="ml-4 text-xl font-semibold">Pagamentos</h1>
          </div>
          <Button>Novo Pagamento</Button>
        </div>
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Detalhes</Button>
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

