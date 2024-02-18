import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isServerSide() {
  return typeof window === 'undefined';
}

export function formatMoney(value: number) {
  return Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(value);
}
