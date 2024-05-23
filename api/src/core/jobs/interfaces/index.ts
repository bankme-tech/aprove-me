export interface IJob {
  execute(...args: any[]): Promise<any> | any;
}
