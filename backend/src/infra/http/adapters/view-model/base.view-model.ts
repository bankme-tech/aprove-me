export abstract class BaseViewModel {
	public static toHTTP: <TModel, TResponse>(model: TModel) => TResponse;
}
