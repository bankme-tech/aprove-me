import { Control } from "react-hook-form";
import InputComboBox from "./InputComboBox";
import { BASE_URL } from "@/contants";

const AssignorsComboBox = async ({control, errors, token}: {
    control: Control<any>
    errors: any
    token: string
}) => {

    const res = await fetch(`${BASE_URL}/integrations/assignor`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });
    const data = await res.json();

    return (
        <InputComboBox
            label="Cedente"
            name="assignorId"
            optionLabel="name"
            optionValue="id"
            options={data}
            placeholder="Selecione um Cedente"
            control={control}
            errors={errors}
            rules={{ required: "Cedente obrigatório" }}
        />
    )
}

export default AssignorsComboBox;