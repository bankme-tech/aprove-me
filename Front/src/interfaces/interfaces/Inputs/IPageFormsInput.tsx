import { IWarnSuccess } from "../Warn/IWarnSuccess";
import { InputMaskType } from "./InputMaskType";
import { PageFormsInputType } from "./PageFormsInputType";

export interface IPageFormsInput {
  disabled?: boolean;
  extraProps?: {
    password?: {
      warns: IWarnSuccess[];
    };
    mask?: {
      maskType?: InputMaskType;
    };
    select?: {
      options?: (string | number | boolean)[];
    };
  };
  label: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type: PageFormsInputType;
}
