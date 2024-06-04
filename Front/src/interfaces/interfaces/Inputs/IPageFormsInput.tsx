import { InputMaskType } from "./InputMaskType";
import { PageFormsInputType } from "./PageFormsInputType";

export interface IPageFormsInput {
  disabled?: boolean;
  label: string;
  maskType?: InputMaskType;
  name?: string;
  options?: (string | number | boolean)[];
  placeholder?: string;
  required?: boolean;
  type: PageFormsInputType;
}
