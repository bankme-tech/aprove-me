import { Control } from "react-hook-form";
import InputComboBox from "./InputComboBox";
import { BASE_URL } from "@/contants";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const AssignorsComboBox = async ({control, errors, token, router}: {
    control: Control<any>
    errors: any
    token: string
    router: AppRouterInstance
}) => {

    const res = await fetch(`${BASE_URL}/integrations/assignor`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });
    const data = await res.json();

    if(data?.statusCode === 401) {
        router.push("/");
        return;
    }

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