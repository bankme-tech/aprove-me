export interface IBaseVO {
  id: string;
  isValid(): string;
  isEqual(data: IBaseVO): Boolean;
}
