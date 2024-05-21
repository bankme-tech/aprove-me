import { useEffect } from "react";
import { AssignorType } from "../types";

interface Props {
  label: string;
  value: string | number;
  setValue: (value: string) => void
  options: AssignorType[]
  disabled: boolean
}

export default function Combobox(props: Props) {
  useEffect(()=> {
    props.setValue('')
  }, [props.disabled])
  return (
    <div className="flex flex-col gap-2 text-textColor font-normal">
      <label htmlFor='combobox'>{props.label}:</label>
      <select
        name="combobox"
        id="combobox"
        className={"min-w-64 w-full py-2 px-3 placeholder:gray-400 rounded-2xl bg-HeaderBgColor outline-none border-2 border-gray-400 focus:border-themeColor focus:border-opacity-70 " +
          (props.disabled ? 'opacity-20' : '')
        }
        value={props.value}
        onChange={(e) => { props.setValue(e.target.value) }}
        disabled={props.disabled}
        
      >
        <option value="" hidden disabled></option>
        {props.options.map((option) => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  )

}