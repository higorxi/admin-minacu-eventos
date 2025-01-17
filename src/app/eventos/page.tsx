"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { NewEventModal } from "@/components/new-event-moda";
import { useState } from "react";

const events = [
  {
    id: 1,
    name: "Festa de Aniversário",
    date: "2023-07-15",
    tickets: 50,
    sold: 30,
  },
  {
    id: 2,
    name: "Conferência Tech",
    date: "2023-08-01",
    tickets: 200,
    sold: 150,
  },
  { id: 3, name: "Show de Rock", date: "2023-08-15", tickets: 1000, sold: 800 },
];

export default function EventosPage() {
  const [isNewEventModalOpen, setIsNewEventModalOpen] =
    useState<boolean>(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between ">
          <div className="flex items-center justify-between space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Eventos</h1>
          </div>

          <Button onClick={() => setIsNewEventModalOpen(true)}>
            Novo Evento
          </Button>
        </div>
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ingressos</TableHead>
                <TableHead>Vendidos</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.tickets}</TableCell>
                  <TableCell>{event.sold}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <NewEventModal
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
      />
    </div>
  );
}
