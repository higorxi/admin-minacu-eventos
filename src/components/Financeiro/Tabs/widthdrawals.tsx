import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, ArrowDownCircle, CheckCircle2, XCircle, Clock3 } from "lucide-react";

interface Withdrawal {
  id: string;
  amount: number;
  eventName: string;
  status: "completed" | "pending" | "failed";
  requestDate: string;
  pixKey: string;
  completedDate?: string;
}

export default function WithdrawalsSection() {
  const withdrawals: Withdrawal[] = [
    {
      id: "1",
      amount: 1500.0,
      eventName: "Festival de Música",
      status: "completed",
      requestDate: "2024-01-15",
      pixKey: "email@exemplo.com",
      completedDate: "2024-01-16",
    },
    {
      id: "2",
      amount: 2750.5,
      eventName: "Show de Rock",
      status: "pending",
      requestDate: "2024-01-17",
      pixKey: "11999999999",
    },
    {
      id: "3",
      amount: 890.0,
      eventName: "Teatro Municipal",
      status: "failed",
      requestDate: "2024-01-14",
      pixKey: "123.456.789-00",
    },
    {
      id: "4",
      amount: 3200.0,
      eventName: "Festa de Formatura",
      status: "completed",
      requestDate: "2024-01-13",
      pixKey: "joao@email.com",
      completedDate: "2024-01-14",
    },
    {
      id: "5",
      amount: 1250.75,
      eventName: "Festival de Jazz",
      status: "completed",
      requestDate: "2024-01-12",
      pixKey: "maria@email.com",
      completedDate: "2024-01-13",
    },
    {
      id: "6",
      amount: 4500.0,
      eventName: "Exposição de Arte",
      status: "pending",
      requestDate: "2024-01-11",
      pixKey: "carlos@email.com",
    },
    {
      id: "7",
      amount: 950.0,
      eventName: "Show de Stand-up",
      status: "completed",
      requestDate: "2024-01-10",
      pixKey: "ana@email.com",
      completedDate: "2024-01-11",
    },
  ];

  const getStatusConfig = (status: Withdrawal["status"]) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle2,
          colorClass: "text-emerald-600 bg-emerald-50",
          label: "Concluído"
        };
      case "pending":
        return {
          icon: Clock3,
          colorClass: "text-amber-600 bg-amber-50",
          label: "Pendente"
        };
      case "failed":
        return {
          icon: XCircle,
          colorClass: "text-rose-600 bg-rose-50",
          label: "Falhou"
        };
      default:
        return {
          icon: Clock,
          colorClass: "text-gray-600 bg-gray-50",
          label: status
        };
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <ArrowDownCircle className="w-5 h-5 text-blue-600" />
          Histórico de Saques
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4 max-h-[50vh] min-h-[50vh] overflow-y-auto pr-2 scrollbar-hide ">
          {withdrawals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum saque encontrado
            </div>
          ) : (
            withdrawals.map((withdrawal) => {
              const statusConfig = getStatusConfig(withdrawal.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={withdrawal.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        R${" "}
                        {withdrawal.amount.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {withdrawal.eventName}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusConfig.colorClass}`}
                    >
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig.label}
                    </span>
                  </div>
                  <div className="text-sm space-y-1 text-gray-600">
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Solicitado em:</span>
                      {new Date(withdrawal.requestDate).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Chave PIX:</span>
                      {withdrawal.pixKey}
                    </p>
                    {withdrawal.completedDate && (
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Concluído em:</span>
                        {new Date(withdrawal.completedDate).toLocaleDateString(
                          "pt-BR"
                        )}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}