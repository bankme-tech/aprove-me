import { createContext } from "react";

export type FormContext = {
	errors: { code: string; field?: string; message: string }[];
	data: Record<string, unknown>;

	setValue(key: string, value: unknown): void;
}

export const formContext = createContext<FormContext>({ errors: [], data: {}, setValue(k, v) {} })