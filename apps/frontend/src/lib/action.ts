export default function action <
	Output
> (callback: (data: FormData) => Promise<Output>) {
	return async function (state: any, input?: FormData) {
		return callback(input!)
	}
}