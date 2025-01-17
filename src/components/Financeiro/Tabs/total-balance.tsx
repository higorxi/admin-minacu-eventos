import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export default function TotalBalanceCard() {
  const totalBalance = 50000;
  const availableForWithdrawal = 32560;
  const numberOfClients = 300;
  const ticketsSold = 1500;

  return (
    <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-lg opacity-90">Saldo Total</p>
            <h2 className="text-3xl font-bold">
              R${" "}
              {totalBalance.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </h2>
          </div>
          <div className="flex-1">
            <p className="text-lg opacity-90">Valor Disponivel Para Saque</p>
            <h2 className="text-3xl font-bold">
              R${" "}
              {availableForWithdrawal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </h2>
          </div>
          <Wallet className="w-12 h-12 opacity-80" />
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex-1">
            <span className="font-semibold">Clientes</span>
            <p className="text-sm opacity-70">{numberOfClients}</p>
          </div>
          <div className="flex-1">
            <span className="font-semibold">Ingressos Vendidos</span>
            <p className="text-sm opacity-70">{ticketsSold}</p>
          </div>

          <Wallet className="w-12 h-12 opacity-0" />
        </div>
      </CardContent>
    </Card>
  );
}
