"use client"

import Field from "@/components/form/field";
import Form from "@/components/form/form";
import Combobox from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { index } from "@/server/assignor";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
	action(data: FormData): Promise<any>;
	data?: Record<string, unknown>;

	children: React.ReactNode;
}

export default function PayableForm(props: Props) {
	const [search, setsearch] = useState("")
	const { data } = useQuery({
		queryKey: ["assignor", search],
		async queryFn ({ queryKey }) {
			const response = await index({ q: queryKey[1] })

			return response?.data.map(t => ({ value: t.id, label: t.name })) || []
		},
		initialData: [],
	})

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
				render={(field) => (
					<Combobox
						{...field}
						options={data}
						onSearchChange={setsearch}
						placeholder="Pesquise um cedente"
					/>
				)}
			/>

			{props.children}
		</Form>
	)
}