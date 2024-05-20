interface Props {
  type: "text" | "number" | "password" | "date" | "email";
  placeholder: string;
  label?: string;
  value: string | number;
  setValue: ((value: string) => void) | ((value: number) => void);
  list?: string;
  listArray?: string[]
}

export default function Input(props: Props) {
  return (
    <div className="flex flex-col gap-2 text-textColor font-semibold">
      {
        props.label && <label>{props.label}</label>
      }
      <input
        className="min-w-64 w-full py-2 px-3 placeholder:gray-400 rounded-2xl bg-HeaderBgColor 
        outline-none border-2 border-gray-400 focus:border-themeColor focus:border-opacity-70"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        {...props.type === 'number' && { step: '0.01' }}
        onChange={(e) => {
          // Verifica o tipo de props.value e chama a função setValue apropriada
          if (props.type === 'number') {
            (props.setValue as (value: number) => void)(parseFloat(e.target.value));
          } else {
            (props.setValue as (value: string) => void)(e.target.value);
          }
        }}
      />
    </div>
  )

}