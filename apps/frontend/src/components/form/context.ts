import { createContext } from "react";

export type FormContext = {
	errors: { code: string; field?: string; message: string }[];
}

export const formContext = createContext<FormContext>({ errors: [] })