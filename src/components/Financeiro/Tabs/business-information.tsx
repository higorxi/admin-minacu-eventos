import { BusinessInfo } from "@/app/financeiro/page";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, AlertCircle } from "lucide-react";

import { useState } from "react";

const fakeBusinessInfo: BusinessInfo = {
  companyName: "Minha Empresa LTDA",
  cnpj: "12.345.678/0001-90",
  responsibleName: "João Silva",
  email: "contato@minhaempresa.com.br",
  phone: "(11) 91234-5678",
  address: {
    street: "Rua Fictícia",
    number: "123",
    complement: "Apto 101",
    neighborhood: "Centro",
    zipCode: "01000-000",
    city: "São Paulo",
    state: "SP",
  },
};

export default function BusinessInfoSection() {
  const [businessInfo] = useState<BusinessInfo>(fakeBusinessInfo);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call to update business info
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 ">
          <Building2 className="w-5 h-5" />
          Informações Empresariais
        </CardTitle>
        <CardDescription>
          Dados da sua empresa para emissão de notas fiscais e documentos
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[50vh] min-h-[50vh] overflow-y-auto scrollbar-hide">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Razão Social</label>
                <Input
                  placeholder="Razão Social"
                  defaultValue={businessInfo?.companyName}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CNPJ</label>
                <Input
                  placeholder="00.000.000/0000-00"
                  defaultValue={businessInfo?.cnpj}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Nome do Responsável
                </label>
                <Input
                  placeholder="Nome Completo"
                  defaultValue={businessInfo?.responsibleName}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail</label>
                <Input
                  type="email"
                  placeholder="email@empresa.com"
                  defaultValue={businessInfo?.email}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Telefone</label>
                <Input
                  placeholder="(00) 00000-0000"
                  defaultValue={businessInfo?.phone}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-lg">Endereço</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Rua</label>
                  <Input
                    placeholder="Nome da Rua"
                    defaultValue={businessInfo?.address.street}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Número</label>
                  <Input
                    placeholder="Número"
                    defaultValue={businessInfo?.address.number}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Complemento</label>
                  <Input
                    placeholder="Complemento (opcional)"
                    defaultValue={businessInfo?.address.complement}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bairro</label>
                  <Input
                    placeholder="Bairro"
                    defaultValue={businessInfo?.address.neighborhood}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">CEP</label>
                  <Input
                    placeholder="00000-000"
                    defaultValue={businessInfo?.address.zipCode}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cidade</label>
                  <Input
                    placeholder="Cidade"
                    defaultValue={businessInfo?.address.city}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <Select defaultValue={businessInfo?.address.state}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Add all Brazilian states */}
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      {/* ... other states */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Editar Informações
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Razão Social</p>
                <p className="font-medium">
                  {businessInfo?.companyName || "Não informado"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CNPJ</p>
                <p className="font-medium">
                  {businessInfo?.cnpj || "Não informado"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Responsável</p>
                <p className="font-medium">
                  {businessInfo?.responsibleName || "Não informado"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">E-mail</p>
                <p className="font-medium">
                  {businessInfo?.email || "Não informado"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telefone</p>
                <p className="font-medium">
                  {businessInfo?.phone || "Não informado"}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-4">Endereço</h4>
              {businessInfo?.address ? (
                <div className="prose">
                  <p>
                    {businessInfo.address.street}, {businessInfo.address.number}
                    {businessInfo.address.complement &&
                      `, ${businessInfo.address.complement}`}
                  </p>
                  <p>
                    {businessInfo.address.neighborhood} - CEP:{" "}
                    {businessInfo.address.zipCode}
                  </p>
                  <p>
                    {businessInfo.address.city}/{businessInfo.address.state}
                  </p>
                </div>
              ) : (
                <p className="text-gray-600">Endereço não informado</p>
              )}
            </div>

            <Alert className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <AlertDescription className="ml-2 text-yellow-800">
                  Estas informações serão utilizadas para emissão de documentos
                  fiscais. Mantenha-as sempre atualizadas.
                </AlertDescription>
              </div>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
