"use client"

import { useContext } from "react";
import { formContext } from "./context";

export default function FormError () {
	const context = useContext(formContext)

	const errors = context.errors.filter(t => !t.field)

	if (errors.length === 0) return null

	return (
		<div className="space-y-2 mb-4 bg-destructive p-2 rounded">
			{errors.length > 0 && (
				<p className="text-sm font-medium text-white">
					{errors[0].message}
				</p>
			)}
		</div>
	)
}