"use client"

import { useFormState } from "react-dom";
import { formContext } from "./context";

type Props = {
	action (state: any, data: FormData): Promise<any>;

	children: React.ReactNode;
}


export default function Form (props: Props) {
	const [state, dispatch] = useFormState(props.action, { errors: [] })

	return (
		<form action={dispatch}>
			<formContext.Provider value={{errors: [], ...state}}>
				{props.children}
			</formContext.Provider>
		</form>
	)
}