"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { register } from "../actions";
import Field from "@/components/form/field";
import Form from "@/components/form/form";
import FormError from "@/components/form/form-error";

export default function Page () {
	return (
		<div className="flex flex-col gap-4 animate-fade-in">
			<Card>
				<CardHeader>
					<h1 className="text-2xl">Registro</h1>
				</CardHeader>

				<CardContent>
					<Form action={register}>
						<FormError />

						<Field
							name="login"
							label="Login"
							render={(field) => <Input {...field} placeholder="johndoe" />}
						/>
						<Field
							name="password"
							label="Password"
							render={(field) => <Input {...field} placeholder="******" type="password" />}
						/>

						<Button type="submit" className="w-full">Cadastrar</Button>
					</Form>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="pt-6">
					Já possui uma conta? Entre uma clicando <Link href="/login">aqui</Link>
				</CardContent>
			</Card>
		</div>
	)
}