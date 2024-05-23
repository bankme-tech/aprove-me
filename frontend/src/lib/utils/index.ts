import { type ClassValue, clsx } from "clsx"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('pt-br', { currency: 'brl', style: 'currency' }).format(value)
}

export function formatDate(date: Date) {
  return format(date, 'PPP', { locale: ptBR })
}

export function getNameInitials(name: string){
    return name.split(' ').map(word => word[0]).join('')
}
