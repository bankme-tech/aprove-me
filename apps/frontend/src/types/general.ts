export type Pagination<Data = unknown> = {
	data: Data;
	page: number;
	limit: number;
	pages: number;
}