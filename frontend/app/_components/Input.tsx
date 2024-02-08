import { InputText } from "primereact/inputtext";

const Input = ({label, onChange, value, type}: {
    label: string, onChange: (event: any) => void, value: string, type?: string
}) => {
    return (
        <div className="w-full flex flex-col gap-1">
            <label>{label}</label>
            <InputText
                type={type}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default Input;