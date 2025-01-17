import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { BankAccount } from "@/app/financeiro/page";

interface BankKeysSectionProps {
  isOpen: boolean
  onClose: () => void
  onAddKey: (newKey: BankAccount) => void;
}

export default function BankKeysSection({ onAddKey, isOpen, onClose }: BankKeysSectionProps) {
  const [keyType, setKeyType] = useState<string>("");
  const [keyValue, setKeyValue] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!keyType || !keyValue) {
      setIsFormValid(false);
      return;
    }

    // Simulação de criação de chave
    const newKey: BankAccount = {
      id: Math.random().toString(), // Gerando um id aleatório para a chave
      key: keyValue,
      keyType: keyType,
      status: "active",
    };

    // Passa a nova chave para o componente pai
    onAddKey(newKey);

    // Limpar campos após adicionar
    setKeyType("");
    setKeyValue("");
    setIsFormValid(true);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Cadastrar Nova Chave PIX</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para adicionar uma nova chave PIX à sua conta.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Tipo de Chave */}
          <Select value={keyType} onValueChange={setKeyType}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de Chave PIX" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cpf">CPF</SelectItem>
              <SelectItem value="email">E-mail</SelectItem>
              <SelectItem value="telefone">Telefone</SelectItem>
              <SelectItem value="aleatoria">Chave Aleatória</SelectItem>
            </SelectContent>
          </Select>

          {/* Campo Chave PIX */}
          <Input
            placeholder="Digite sua chave PIX"
            value={keyValue}
            onChange={(e) => setKeyValue(e.target.value)}
            className="border-2"
          />

          {!isFormValid && (
            <p className="text-red-500 text-sm">
              Por favor, preencha todos os campos corretamente.
            </p>
          )}

          <DialogFooter>
            <Button type="submit" className="w-full">
              Cadastrar Chave
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
