import { FormEvent, useEffect, useState } from "react";
import FormCard from "../components/formCard";
import Input from "../components/ui/input";
import Title from "../components/ui/title";
import Button from "../components/ui/button";
import { AssignorType } from "../types";
import { getAssignors } from "../services/assignor";
import Combobox from "../components/combobox";
import { createPayable } from "../services/payable";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ui/errorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const payableSchema = z.object({
  value: z.coerce.number(),
  emissionDate: z.coerce.date(),
  assignor: z.string().optional(),
})

const assignorSchema = z.object({
  document: z.string().max(30),
  email: z.string().email().max(140),
  phone: z.string().max(20),
  name: z.string().max(140)
})

type PayableSchema = z.infer<typeof payableSchema>
type AssignorSchema = z.infer<typeof assignorSchema>

export default function NewPayable() {
  const [assignor, setAssignor] = useState('')
  const [assignors, setAssignors] = useState<AssignorType[]>([])
  const [newAssignor, setNewAssignor] = useState(false)
  const navigate = useNavigate()
  const { register: registerPayable, handleSubmit, setError, getValues: getValuesPayable, formState: { errors } } = useForm<PayableSchema>({
    resolver: zodResolver(payableSchema),
  })
  const { register: registerAssignor, handleSubmit: handleSubmit2, setError: setError2, getValues: getValuesAssignor, formState: { errors: errors2 } } = useForm<AssignorSchema>({
    resolver: zodResolver(assignorSchema),
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const payableData = getValuesPayable();
    const assignorData = getValuesAssignor();
    handleSubmit(onSubmitPayable)(); // Valida o formulário payable
    handleSubmit2(onSubmitAssignor)(); // Valida o formulário assignor
  }

  // Funções de manipulação de envio para cada formulário
  const onSubmitPayable: SubmitHandler<PayableSchema> = (data) => {
    console.log(errors)
  }

  const onSubmitAssignor: SubmitHandler<AssignorSchema> = (data) => {
    console.log(errors2)

  }

  // const onError = () => {
  //   console.log(errors)
  //   if(!newAssignor && errors.email){
  //     return
  //   }
  //   setError("root", { message: 'Preencha todos os campos corretamente!' })
  // }


  useEffect(() => {
    const fetchAssignors = async () => {
      try {
        const data = await getAssignors()
        setAssignors(data)
      } catch (error) {
        console.error('Erro ao buscar os cedentes', error);
      }
    };

    fetchAssignors()
  }, [])

  return (
    <div className="flex flex-col items-center w-full gap-6">
      <Title>Cadastre um pagável:</Title>

      <FormCard>
        <ErrorMessage error={errors.root} />
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => onSubmit(e)}
        >

          <div className="flex gap-6">
            {/* payable data */}
            <div className="flex flex-col gap-3 items-end">
              <Input
                label="Valor"
                placeholder="Valor"
                register={registerPayable('value')}
              />
              <Input
                type="date"
                label="Data de emissão"
                register={registerPayable('emissionDate')}
              />
              <Combobox
                label="Cedente"
                value={assignor}
                setValue={setAssignor}
                options={assignors}
                disabled={newAssignor}
              />
              <button
                className="text-themeColor text-sm hover:text-opacity-90 ease-in-out duration-20"
                onClick={(event) => {
                  event.preventDefault();
                  setNewAssignor(!newAssignor);
                }}
              >
                {newAssignor ? 'X' : 'Novo cedente?'}
              </button>
            </div>

            {/* assignor data */}
            {
              newAssignor && (
                <div className={"flex-col gap-3 flex"} >
                  <Input
                    label="CPF ou CNPJ do Cedente:"
                    placeholder="CPF ou CNPJ"
                    register={registerAssignor('document')}
                  />
                  <Input
                    label="Email do Cedente:"
                    placeholder="Email"
                    register={registerAssignor('email')}
                  />
                  <Input
                    label="Telefone do cedente:"
                    placeholder="Telefone"
                    register={registerAssignor('phone')}
                  />
                  <Input
                    label="Nome do cedente:"
                    placeholder="Nome"
                    register={registerAssignor('name')}
                  />
                </div>
              )
            }

          </div>

          <Button type="submit" >Cadastrar</Button>
        </form>
      </FormCard>
    </div>
  )
}