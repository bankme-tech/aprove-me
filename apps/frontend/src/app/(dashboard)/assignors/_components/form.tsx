"use client"

import Field from "@/components/form/field";
import Form from "@/components/form/form";
import { Input } from "@/components/ui/input";

type Props = {
	action(data: FormData): Promise<any>;
	data?: Record<string, unknown>;

	children: React.ReactNode;
}

export default function AssignorForm(props: Props) {
	return (
		<Form action={props.action} data={props.data} className="max-w-sm">
			<Field
				name="name"
				label="Nome"
				render={(field) => <Input {...field} />}
			/>
			<Field
				name="phone"
				label="Celular"
				render={(field) => <Input {...field} />}
			/>
			<Field
				name="document"
				label="Documento (CPF/CNPJ)"
				render={(field) => <Input {...field} />}
			/>
			<Field
				name="email"
				label="E-Mail"
				render={(field) => <Input {...field} />}
			/>

			{props.children}
		</Form>
	)
}