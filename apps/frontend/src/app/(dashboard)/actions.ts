"use server"

import action from "@/lib/action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = action(async function () {
	cookies().delete("token")

	redirect("/login")
})