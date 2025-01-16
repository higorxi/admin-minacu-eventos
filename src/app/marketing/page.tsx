"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Mail,
  Smartphone,
  PhoneIcon as WhatsappIcon,
  UserCheck,
  UserX,
  Battery,
  Signal,
  Wifi,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CampaignCards } from "@/components/campaign-cards";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  lastLogin: string;
}

interface Attachment {
  name: string;
}

const MarketingDashboard = () => {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      phone: "11999999999",
      status: "inactive",
      lastLogin: "2024-01-10",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "11988888888",
      status: "active",
      lastLogin: "2024-01-15",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@email.com",
      phone: "11977777777",
      status: "inactive",
      lastLogin: "2023-12-20",
    },
    // Add more users here to test pagination
  ]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [messagePreview, setMessagePreview] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [attachment, setAttachment] = useState<Attachment | null>(null);

  const usersPerPage = 8;

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleUserSelection = (userId: number) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSelectAll = (e: React.FormEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      setSelectedUsers(currentUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };
  

  const buscarAttachment = async () => {
    try {
      const response = await fetch("/api/buscarAttachment");
      if (!response.ok) {
        throw new Error("Failed to fetch attachment");
      }
      const data: Attachment = await response.json();
      setAttachment(data);
    } catch (error) {
      console.error("Error fetching attachment:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-none p-6 bg-white z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Marketing</h1>
          <div className="flex gap-4">
            <Input
              placeholder="Buscar usuários..."
              className="w-64"
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
            <Button onClick={buscarAttachment}>Buscar Usuário</Button>
          </div>
        </div>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Coluna da esquerda (75% de largura) */}
        <div className="w-3/4 p-6 overflow-y-auto">
          {/* Lista de Usuários */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Usuários</CardTitle>
              <CardDescription>
                {selectedUsers.length} usuários selecionados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">
                        <Checkbox
                          onChange={handleSelectAll}
                          checked={
                            selectedUsers.length === currentUsers.length &&
                            currentUsers.length > 0
                          }
                        />
                      </th>
                      <th className="text-left p-2">Nome</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Telefone</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Último Acesso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user) => (
                      <tr
                        key={user.id}
                        className={`border-b hover:bg-gray-50 cursor-pointer ${
                          selectedUsers.includes(user.id) ? "bg-blue-50" : ""
                        }`}
                        onClick={() => handleUserSelection(user.id)}
                      >
                        <td className="p-2">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onChange={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{user.phone}</td>
                        <td className="p-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status === "active" ? (
                              <UserCheck className="w-3 h-3 mr-1" />
                            ) : (
                              <UserX className="w-3 h-3 mr-1" />
                            )}
                            {user.status}
                          </span>
                        </td>
                        <td className="p-2">{user.lastLogin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage((prev) => prev - 1);
                          }
                        }}
                        className={currentPage === 1 ? "disabled-class" : ""}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => setCurrentPage(i + 1)}
                          isActive={currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => {
                          if (currentPage < totalPages) {
                            setCurrentPage((prev) => prev + 1);
                          }
                        }}
                        className={
                          currentPage === totalPages ? "disabled-class" : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>

          {/* Campanhas */}
          <Card>
            <CardHeader>
              <CardTitle>Campanhas Pré-definidas</CardTitle>
              <CardDescription>
                Escolha uma campanha pré-definida para começar rapidamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CampaignCards />
            </CardContent>
          </Card>
        </div>

        {/* Coluna da direita (25% de largura) */}
        <div className="w-1/4 p-6 overflow-y-auto bg-gray-50">
          {/* Preview e Envio de Mensagens */}
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Enviar Mensagem</CardTitle>
              <CardDescription>Visualize e envie mensagens</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sms" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="sms">
                    <Smartphone className="w-4 h-4 mr-2" />
                    SMS
                  </TabsTrigger>
                  <TabsTrigger value="whatsapp">
                    <WhatsappIcon className="w-4 h-4 mr-2" />
                    WhatsApp
                  </TabsTrigger>
                  <TabsTrigger value="email">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="sms" className="flex-grow">
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite sua mensagem SMS..."
                      className="h-32"
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setMessagePreview(e.target.value)
                      }
                    />

                    {/* Preview do Celular - SMS */}
                    <div className="w-full max-w-[300px] mx-auto bg-black rounded-3xl p-3 shadow-xl">
                      <div className="bg-white rounded-2xl h-[500px] overflow-hidden">
                        {/* Status Bar */}
                        <div className="bg-gray-100 flex justify-between items-center px-4 py-2">
                          <div>9:41</div>
                          <div className="flex items-center gap-2">
                            <Signal size={16} />
                            <Wifi size={16} />
                            <Battery size={16} />
                          </div>
                        </div>
                        {/* Mensagem */}
                        <div className="p-4 bg-gray-50 h-full">
                          <div className="bg-blue-500 text-white p-3 rounded-lg max-w-[80%] shadow-sm">
                            {messagePreview ||
                              "Sua mensagem SMS aparecerá aqui..."}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="whatsapp" className="flex-grow">
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite sua mensagem WhatsApp..."
                      className="h-32"
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setMessagePreview(e.target.value)
                      }
                    />

                    {/* Preview do Celular - WhatsApp */}
                    <div className="w-full max-w-[300px] mx-auto bg-black rounded-3xl p-3 shadow-xl">
                      <div className="bg-white rounded-2xl h-[500px] overflow-hidden">
                        {/* Status Bar */}
                        <div className="bg-[#075E54] flex items-center px-4 py-3 text-white">
                          <WhatsappIcon className="w-6 h-6 mr-2" />
                          <div className="text-sm font-medium">WhatsApp</div>
                        </div>
                        {/* Chat */}
                        <div className="bg-[#ECE5DD] h-full p-4">
                          <div className="bg-white p-3 rounded-lg max-w-[80%] shadow-sm">
                            {messagePreview ||
                              "Sua mensagem WhatsApp aparecerá aqui..."}
                            <div className="text-right text-xs text-gray-500 mt-1">
                              09:41 ✓✓
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="email" className="flex-grow">
                  <div className="space-y-4">
                    <Input
                      placeholder="Assunto do email"
                      className="mb-2"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmailSubject(e.target.value)
                      }
                    />
                    <Textarea
                      placeholder="Digite o conteúdo do email..."
                      className="h-32"
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setMessagePreview(e.target.value)
                      }
                    />

                    {/* Preview do Email */}
                    <div className="border rounded-lg bg-white shadow-md max-w-md mx-auto">
                      <div className="border-b px-6 py-4">
                        <div className="text-gray-500 text-sm mb-1">
                          De: Sua Empresa
                        </div>
                        <div className="text-gray-500 text-sm mb-1">
                          Para: {selectedUsers.length} destinatários
                        </div>
                        <div className="font-medium">
                          {emailSubject || "Sem assunto"}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="prose prose-sm">
                          {messagePreview ||
                            "O conteúdo do seu email aparecerá aqui..."}
                        </div>
                        <hr className="my-6" />
                        <div className="text-sm text-gray-500">
                          Atenciosamente,
                          <br />
                          Sua Empresa
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {attachment && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Attachment</h3>
                  <p>{attachment.name}</p>
                  {/* Add more details or a preview of the attachment here */}
                </div>
              )}

              <Button
                className="w-full mt-4"
                disabled={selectedUsers.length === 0}
              >
                Enviar para {selectedUsers.length} usuário
                {selectedUsers.length !== 1 ? "s" : ""}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;
