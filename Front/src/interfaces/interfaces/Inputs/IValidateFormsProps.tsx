export interface IValidateFormsProps {
  minLenght?: { value: number; message: string };
  maxLenght?: { value: number; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  setValueAs?: <T>(value: any) => T;
  valueAsDate?: any;
  valueAsNumber?: any;
}
