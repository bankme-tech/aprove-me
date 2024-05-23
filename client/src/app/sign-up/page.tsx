'use client';

import axios from 'axios';
import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    'last-name': '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false); 

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { name, email, password } = formData;
    const fullName = `${name} ${formData['last-name']}`;
    setIsLoading(true); 

  
    try {
      const response = await axios.post('http://localhost:3003/users', {
        name: fullName,
        email,
        password,
      });


      toast.success("Usuário cadastrado com sucesso!", {
      
        description: "Você foi cadastrado com sucesso!",
        action: {
          label: "Fechar",
          onClick: () =>("Fechar"),
        }
      });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      if ((error as any).response && (error as any).response.data && (error as any).response.data.message) {
        toast.error("Erro ao cadastrar usuário!", {
          description: (error as any).response.data.message,
          action: {   
            label: "Fechar",
            onClick: () => console.log("Fechar"),
          }
        });
      } else {
        toast.error("Erro ao cadastrar usuário!", {
          description: "Erro desconhecido",
          action: {
            label: "Fechar",
            onClick: () => console.log("Fechar"),
          }
        });
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="mx-auto max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Cadastre-se</CardTitle>
            <CardDescription>Informe seus dados para se cadastrar:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid  gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" name="name" placeholder="Max" value={formData.name} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid gap-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Aceitar termos e condições
                </label>
              </div>

              <div className="relative">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Carregando...' : 'Criar conta'}
              </Button>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                    <LoadingSpinner className="text-primary" />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Já possui cadastro?{' '}
              <Link href="http://localhost:3000/sign-in" className="underline">
                Faça login
              </Link>
            </div>
          </CardContent>
        </Card>
  

      </form>
   
      <div className="absolute top-0 left-0 m-4">
      <Button variant="outline" size="icon" onClick={handleClick}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </div>
    </div>
    
  );
}

const handleClick = () => {
  window.location.href = 'http://localhost:3000';
};



export const LoadingSpinner = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("animate-spin", className)}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);


