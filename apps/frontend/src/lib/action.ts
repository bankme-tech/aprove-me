import { currentUser } from "./api"

export default function action <
	Output
> (callback: (data: FormData) => Promise<Output>) {
	return async function (state: any, input?: FormData) {
		const user = await currentUser()

		if (!user) return { errors: [{ message: "Unauthenticated" }] } as unknown as Output

		return callback(input!)
	}
}