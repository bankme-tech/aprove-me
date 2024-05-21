export interface IUseCase {
  execute(...args: any[]): Promise<any> | any;
}
