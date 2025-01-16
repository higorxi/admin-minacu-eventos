import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function ConfiguracoesPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex h-16 items-center px-4">
          <h1 className="ml-4 text-xl font-semibold">Configurações</h1>
        </div>
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Informações da Conta</h2>
            <Separator />
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da Empresa</Label>
              <Input id="name" placeholder="Nome da sua empresa" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Preferências</h2>
            <Separator />
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="currency">Moeda</Label>
              <Input id="currency" placeholder="BRL" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timezone">Fuso Horário</Label>
              <Input id="timezone" placeholder="America/Sao_Paulo" />
            </div>
          </div>
          <Button>Salvar Alterações</Button>
        </div>
      </div>
    </div>
  )
}

