"use server"

import action from "@/lib/action";
import api from "@/lib/api";
import { Pagination } from "@/types/general";

type Assignor = {
	document: string;
	email: string;
	phone: string;
	name: string;
}

export const index = action(async (): Promise<Pagination<Assignor>> => {
	return api("/integrations/assignor").then(t => t.json())
})