"use client";

export interface BankAccount {
  id: string;
  type: "pix";
  key: string;
  keyType: "cpf" | "email" | "telefone" | "aleatoria";
  ownerName: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  status: "pending" | "completed";
  totalRevenue: number;
  availableBalance: number;
  ticketsSold: number;
}

export interface Withdrawal {
  id: string;
  amount: number;
  eventId: string;
  eventName: string;
  status: "pending" | "approved" | "completed" | "failed";
  requestDate: string;
  completedDate?: string;
  pixKey: string;
}

export interface BusinessInfo {
  companyName: string;
  cnpj: string;
  responsibleName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

// Components
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisteredKeysSection from "@/components/Financeiro/Tabs/registered-keys";
import EventsSection from "@/components/Financeiro/Tabs/events";
import BusinessInfoSection from "@/components/Financeiro/Tabs/business-information";
import WithdrawalsSection from "@/components/Financeiro/Tabs/widthdrawals";
import TotalBalanceCard from "@/components/Financeiro/Tabs/total-balance";

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState("bank-info");

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Total Balance Card */}
      <TotalBalanceCard />

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="bank-info">Dados Bancários</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="withdrawals">Saques</TabsTrigger>
          <TabsTrigger value="business">Dados Empresariais</TabsTrigger>
        </TabsList>

        {/* Bank Information Tab */}
        <TabsContent value="bank-info" className="space-y-6">
          <RegisteredKeysSection />
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <EventsSection />
        </TabsContent>

        {/* Withdrawals Tab */}
        <TabsContent value="withdrawals" className="space-y-6">
          <WithdrawalsSection />
        </TabsContent>

        {/* Business Information Tab */}
        <TabsContent value="business" className="space-y-6">
          <BusinessInfoSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}





