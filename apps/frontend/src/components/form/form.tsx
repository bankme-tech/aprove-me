"use client"

import { useFormState } from "react-dom";
import { formContext } from "./context";
import { useState } from "react";

type Props = {
	action (state: any, data: FormData): Promise<any>;

	children: React.ReactNode;

	data?: Record<string, unknown>;
	className?: string;
}


export default function Form (props: Props) {
	const [state, dispatch] = useFormState(props.action, { errors: [] })
	const [data, setdata] = useState(props.data || {})

	function setValue (key: string, value: unknown) {
		setdata(prev => ({
			...prev,
			[key]: value,
		}))
	}

	return (
		<form action={dispatch} className={props.className}>
			<formContext.Provider value={{ errors: [], ...state, data, setValue }}>
				{props.children}
			</formContext.Provider>
		</form>
	)
}