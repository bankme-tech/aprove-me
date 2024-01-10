"use client"

import { useFormState } from "react-dom";
import { formContext } from "./context";

type Props = {
	action (state: any, data: FormData): Promise<any>;

	children: React.ReactNode;

	className?: string;
}


export default function Form (props: Props) {
	const [state, dispatch] = useFormState(props.action, { errors: [] })

	return (
		<form action={dispatch} className={props.className}>
			<formContext.Provider value={{errors: [], ...state}}>
				{props.children}
			</formContext.Provider>
		</form>
	)
}