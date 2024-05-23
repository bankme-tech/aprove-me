import { useEffect } from "react";
import { AssignorType } from "../../types";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  register?: UseFormRegisterReturn;
  label?: string;
  options: AssignorType[]
  disabled: boolean
}

export default function Combobox(props: Props) {
  // useEffect(()=> {
  //   props.setValue('')
  // }, [props.disabled])
  return (
    <div className="flex flex-col gap-2 text-textColor font-normal">
      <label htmlFor='combobox'>{props.label}:</label>
      <select
        name="combobox"
        id="combobox"
        className={"min-w-64 w-full py-2 px-3 placeholder:gray-400 rounded-2xl bg-HeaderBgColor outline-none border-2 border-gray-400 focus:border-themeColor focus:border-opacity-70 disabled:opacity-10"}
        {...props.register}
        {...props}
        disabled={props.disabled}
      >
        <option value=""></option>
        {props.options.map((option) => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  )

}