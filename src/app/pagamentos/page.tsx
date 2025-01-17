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
import { Payment, PaymentDetailsModal } from '@/components/payment-details-modal'

const payments: Payment[] = [
  {
    details: {
      buyer: 'João Silva',
      email: 'joao.silva@email.com',
      event: 'Show de Rock',
      date: '2023-07-01',
      venue: 'Estádio Municipal',
      ticket: 'Pista VIP',
      quantity: 1,
      sector: 'VIP',
      paymentMethod: 'Cartão de Crédito',
    },
    amount: 1999.0,
    status: 'Aprovado',
  },
  {
    details: {
      buyer: 'Maria Oliveira',
      email: 'maria.oliveira@email.com',
      event: 'Teatro Infantil',
      date: '2023-07-05',
      venue: 'Teatro Central',
      ticket: 'Plateia',
      quantity: 2,
      sector: 'Plateia Central',
      paymentMethod: 'Boleto',
    },
    amount: 39.0,
    status: 'Pendente',
  },
  {
    details: {
      buyer: 'Carlos Souza',
      email: 'carlos.souza@email.com',
      event: 'Festa Universitária',
      date: '2023-07-10',
      venue: 'Espaço Universitário',
      ticket: 'Camarote Open Bar',
      quantity: 1,
      sector: 'Camarote',
      paymentMethod: 'PIX',
    },
    amount: 299.0,
    status: 'Aprovado',
  },
];

export default function PagamentosPage() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const handleShowDetails = (payment: Payment) => {
    setSelectedPayment(payment);
  };

  const handleCloseModal = () => {
    setSelectedPayment(null);
  };

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
              {payments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.details.date}</TableCell>
                  <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShowDetails(payment)}
                    >
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
