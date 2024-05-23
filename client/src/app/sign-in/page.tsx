'use client';

import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { api, setAuthToken } from '@/services/api';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { email, password } = formData;
    setIsLoading(true);

    try {
        const response = await api.post('/integrations/auth', { email, password });
        const {
            accessToken : token
        }  = response.data;
        localStorage.setItem('authToken', token);
        const decodedToken = jwtDecode(token);
       
    
      toast.success('Login realizado com sucesso!', {
        description: 'Você foi autenticado com sucesso!',
        action: {
          label: 'Fechar',
          onClick: () => ('Fechar'),
        },
      });

    } catch (error) {
        if ((error as any).response && (error as any).response.data && (error as any).response.data.message) {
        toast.error("Erro ao realizar login!", {
        description: (error as any).response.data.message,
          action: {
            label: "Fechar",
            onClick: () => ("Fechar"),
          }
       
        });
     
      } else {
        toast.error('Erro ao realizar login!', {
          description: 'Erro desconhecido',
          action: {
            label: 'Fechar',
            onClick: () => ('Fechar'),
          },
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    window.location.href = 'http://localhost:3000';
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-600">
            Coloque seu email e senha para fazer login
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-9">
          <div className="grid grid-cols-1 gap-8">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="email@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? <LoadingSpinner className="w-6 h-6 mx-auto" /> : 'Login'}
            </Button>
          </div>
        </form>
        <div className="absolute top-0 left-0 m-4">
          <Button variant="outline" size="icon" onClick={handleClick}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

const LoadingSpinner = ({ className }: { className: string }) => (
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