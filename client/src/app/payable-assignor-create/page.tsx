'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { api } from "@/services/api";

export default function CreatePage() {

 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    value: '',
    document: '',
    phone: '',
    emissionDate: new Date().toISOString().substring(0, 10),
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { name, email, value, document, phone, emissionDate } = formData;
  
    setIsLoading(true);
    const token = localStorage.getItem('authToken');
    
    try {
      
      const response = await api.post('/integrations/payable',
      {
        name,
        email,
        value: parseFloat(value.replace(',', '.')),
        document,
        phone,
        emissionDate: new Date(emissionDate), 
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
      });
    
      toast.success("Movimentação cadastrada com sucesso!",
       {
        action: {
          label: "Fechar",
          onClick: () => ("Fechar"),
        },
      });

    } catch (error) {
      if ((error as any).response && (error as any).response.data && (error as any).response.data.message) {
        toast.error("Erro ao cadastrar movimentação!", {
          action: {
            label: "Fechar",
            onClick: () => ("Fechar"),
          },
        });
      } else {
        console.log(error);
        toast.error("Erro ao cadastrar!", {
          description: "Erro desconhecido",
          action: {
            label: "Fechar",
            onClick: () => ("Fechar"),
          },
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="text-center mx-auto px-10 flex flex-col justify-center items-center h-screen">
      <h2 className="text-xl text-muted-foreground"></h2>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="data">Cadastro</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro de Movimentação</CardTitle>
                <CardDescription>
                  Registre aqui os dados do recebível e seu responsável.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <Label htmlFor="name">Nome do Responsável</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Pedro Duarte"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="document">CNPJ ou CPF</Label>
                    <Input
                      id="document"
                      name="document"
                      placeholder="000.000.000-00"
                      value={formData.document}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="aprovame@mail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="value">Valor</Label>
                    <Input
                      id="value"
                      name="value"
                      placeholder="0,00"
                      value={formData.value}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+5511999999999"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="date">Data de Emissão</Label>
                    <Input
                      id="date"
                      name="date"
                      placeholder=""
                      value={formData.emissionDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <CardFooter className="mt-4 flex justify-center">
                <Button style={{ margin: 'auto' }}>Salvar Cadastro</Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="absolute top-0 left-0 m-4">
        <Button variant="outline" size="icon" onClick={handleClick}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
