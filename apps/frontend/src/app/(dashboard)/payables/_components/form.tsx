"use client"

import Field from "@/components/form/field";
import Form from "@/components/form/form";
import { Input } from "@/components/ui/input";

type Props = {
	action(data: FormData): Promise<any>;
	data?: Record<string, unknown>;

	children: React.ReactNode;
}

export default function PayableForm(props: Props) {
	return (
		<Form action={props.action} data={props.data} className="max-w-sm">
			<Field
				name="value"
				label="Valor"
				render={(field) => <Input {...field} />}
			/>
			<Field
				name="emissionDate"
				label="Data de emissão"
				render={(field) => <Input {...field} type="date" />}
			/>
			<Field
				name="assignor"
				label="Cedente"
				render={(field) => <Input {...field} />}
			/>

			{props.children}
		</Form>
	)
}