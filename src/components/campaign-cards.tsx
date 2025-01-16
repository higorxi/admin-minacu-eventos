import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const campaignTypes = [
  { 
    title: "Boas-vindas",
    description: "Introduza novos usuários ao seu produto ou serviço",
    icon: "👋"
  },
  {
    title: "Reengajamento",
    description: "Traga de volta usuários inativos com ofertas especiais",
    icon: "🔁"
  },
  {
    title: "Lançamento de Produto",
    description: "Anuncie novos recursos ou produtos para seus usuários",
    icon: "🚀"
  },
  {
    title: "Promoção Sazonal",
    description: "Aproveite eventos sazonais com campanhas direcionadas",
    icon: "🎉"
  },
];

export function CampaignCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {campaignTypes.map((campaign, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl mr-2">{campaign.icon}</span>
              {campaign.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{campaign.description}</CardDescription>
            <Button className="mt-4 w-full">Usar Template</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

