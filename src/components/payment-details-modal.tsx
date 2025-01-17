interface PaymentDetails {
    buyer: string;
    email: string;
    event: string;
    date: string;
    venue: string;
    ticket: string;
    quantity: string | number;
    sector: string;
    paymentMethod: string;
  }
  
  export interface Payment {
    details: PaymentDetails;
    amount: number;
    status: 'Aprovado' | 'Pendente' | 'Recusado';
  }
  
  interface PaymentDetailsModalProps {
    payment: Payment | null;
    onClose: () => void;
  }
  
  interface SectionContent {
    label: string;
    value?: string | number;
    icon?: React.ReactNode;
    customDisplay?: React.ReactNode;
  }
  
  interface Section {
    title: string;
    icon: React.ReactNode;
    content: SectionContent[];
  }
  
  import React from 'react';
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent } from '@/components/ui/card';
  import { User, Calendar, Ticket, CreditCard, Clock, Mail } from 'lucide-react';
  
  export const PaymentDetailsModal: React.FC<PaymentDetailsModalProps> = ({ payment, onClose }) => {
    const sections: Section[] = [
      {
        title: 'Informações do Comprador',
        icon: <User className="w-5 h-5" />,
        content: [
          { label: 'Nome', value: payment?.details?.buyer },
          { label: 'Email', value: payment?.details?.email, icon: <Mail className="w-4 h-4" /> }
        ]
      },
      {
        title: 'Detalhes do Evento',
        icon: <Calendar className="w-5 h-5" />,
        content: [
          { label: 'Evento', value: payment?.details?.event },
          { label: 'Data', value: payment?.details?.date },
          { label: 'Local', value: payment?.details?.venue }
        ]
      },
      {
        title: 'Informações do Ingresso',
        icon: <Ticket className="w-5 h-5" />,
        content: [
          { label: 'Tipo', value: payment?.details?.ticket },
          { label: 'Quantidade', value: payment?.details?.quantity },
          { label: 'Setor', value: payment?.details?.sector }
        ]
      },
      {
        title: 'Dados do Pagamento',
        icon: <CreditCard className="w-5 h-5" />,
        content: [
          { label: 'Valor', value: payment?.amount ? `R$ ${payment.amount.toFixed(2)}` : undefined },
          { label: 'Método', value: payment?.details?.paymentMethod },
          { 
            label: 'Status', 
            value: payment?.status,
            customDisplay: payment?.status ? (
              <span className={`px-2 py-1 rounded-full text-sm ${
                payment.status === 'Aprovado' ? 'bg-green-100 text-green-800' :
                payment.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {payment.status}
              </span>
            ) : undefined
          }
        ]
      }
    ];
  
    return (
      <Dialog open={!!payment} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Clock className="w-6 h-6" />
              Detalhes do Pagamento
            </DialogTitle>
          </DialogHeader>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {sections.map((section, index) => (
              <Card key={index} className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    {section.icon}
                    <h3 className="font-semibold text-lg">{section.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        {item.customDisplay || (
                          <span className="font-medium">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
  
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default PaymentDetailsModal;