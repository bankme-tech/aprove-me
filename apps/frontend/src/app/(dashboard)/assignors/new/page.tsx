"use client"

import Field from "@/components/form/field";
import Form from "@/components/form/form";
import { Input } from "@/components/ui/input";
import Dashtitle from "@/components/ui/dashtitle";
import { Button } from "@/components/ui/button";
import { store } from "@/server/assignor";

export default function Page () {
	return (
		<>
			<Dashtitle title="Criar cedente" back="/assignors" />

			<Form action={store} className="max-w-sm">
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

				<Button>Criar</Button>
			</Form>
		</>
	)
}