"use client"

import { useContext, useState } from "react";
import { formContext } from "./context";
import { Label } from "../ui/label";

type Props = {
	name: string;
	label?: string;
	description?: string;
	render (field: { id: string; name: string; value: any; onChange(data: any): void }): React.ReactNode;
}

export default function Field (props: Props) {
	const context = useContext(formContext)

	const errors = context.errors.filter(t => t.field === props.name)

	return (
		<fieldset className="space-y-2 mb-4">
			{
				props.label &&
				<Label htmlFor={props.name}>{props.label}</Label>
			}
			{props.render({ value: context.data[props.name] || "", name: props.name, id: props.name, onChange (data) {
				if (data?.target.value) context.setValue(props.name, data.target.value)
				else context.setValue(props.name, data)
			} })}

			{props.description && <p className="text-sm text-muted-foreground">{props.description}</p>}

			{errors.length > 0 && (
				<p className="text-sm font-medium text-destructive">
					{errors[0].message}
				</p>
			)}
		</fieldset>
	)
}