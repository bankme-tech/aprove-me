import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const transformCurrency = (value: number) =>
  new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const transformDate = (value: string) =>
  new Intl.DateTimeFormat("pt-br").format(new Date(value));

export const setToken = (token: string) =>
  localStorage.setItem(import.meta.env.TOKEN_KEY, token);

export const getToken = () => localStorage.getItem(import.meta.env.TOKEN_KEY);

export const removeToken = () =>
  localStorage.removeItem(import.meta.env.TOKEN_KEY);

export const isLoggedIn = () => !!getToken();
