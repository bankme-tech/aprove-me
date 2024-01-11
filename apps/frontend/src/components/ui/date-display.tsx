"use client"

import { useEffect, useState } from "react";

type Props = {
	date?: string;
}

export default function DateDisplay (props: Props) {
	const [mounted, setMounted] = useState(false)

	useEffect(function () {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return new Date(props.date!).toLocaleDateString()
}