import { FormErrorProps } from "./formError.types";

export const FormError = (props: FormErrorProps) => {
  return props.message && <span className="text-red-500">{props.message}</span>;
};
