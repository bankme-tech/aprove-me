import { AllTypes } from "interfaces/interfaces/Global/AllTypes";

export interface IInfo {
  type?: "text" | "boolean" | "currency" | "date";
  title?: string;
  description?: AllTypes;
}
