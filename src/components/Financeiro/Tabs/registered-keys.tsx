import { BankAccount } from "@/app/financeiro/page";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CirclePlus, HandCoins } from "lucide-react";
import { useState } from "react";
import BankKeysSection from "./bank-information";

export default function RegisteredKeysSection() {
  const [registeredKeys, setRegisteredKeys] = useState<BankAccount[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddKey = (newKey: BankAccount) => {
    setRegisteredKeys((prevKeys) => [...prevKeys, newKey]);
    setIsModalOpen(false); // Fecha o modal após adicionar a chave
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <HandCoins className="w-5 h-5" />
            <p className="ml-2"> Chaves PIX Cadastradas</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            CADASTRAR
            <CirclePlus className="w-5 h-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[50vh] min-h-[50vh] overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
          {registeredKeys.map((key) => (
            <div
              key={key.id}
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{key.key}</p>
                <p className="text-sm text-gray-600">Tipo: {key.keyType}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  {key.status === "active" ? "Desativar" : "Ativar"}
                </Button>
                <Button variant="destructive" size="sm">
                  Remover
                </Button>
              </div>
            </div>
          ))}
          {registeredKeys.length === 0 && (
            <p className="text-center justify-center text-gray-500">
              Nenhuma chave PIX cadastrada
            </p>
          )}
        </div>
      </CardContent>

      {isModalOpen && (
        <BankKeysSection
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddKey={handleAddKey}
        />
      )}
    </Card>
  );
}
