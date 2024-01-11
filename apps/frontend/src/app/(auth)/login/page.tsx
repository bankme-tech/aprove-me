"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { login } from "../actions";
import Field from "@/components/form/field";
import Form from "@/components/form/form";
import FormError from "@/components/form/form-error";

export default function Page () {
	return (
		<div className="flex flex-col gap-4 animate-fade-in">
			<Card>
				<CardHeader>
					<h1 className="text-2xl">Login</h1>
				</CardHeader>

				<CardContent>
					<Form action={login}>
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

						<Button type="submit" className="w-full">Entrar</Button>
					</Form>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="pt-6">
					Não possui uma conta? Crie uma clicando <Link href="/register">aqui</Link>
				</CardContent>
			</Card>
		</div>
	)
}