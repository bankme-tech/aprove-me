import { FormEvent, useEffect, useState } from "react";
import FormCard from "../components/formCard";
import Title from "../components/ui/title";
import Button from "../components/ui/button";
import { AssignorSchema, AssignorType, PayableSchema, PayableType, assignorSchema, payableSchema } from "../types";
import { getAssignors } from "../services/assignor";
import { createPayable } from "../services/payable";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import PayableFormInputs from "../components/payableFormInputs";
import AssignorFormInputs from "../components/assignorFormInputs";
import { UUID } from "crypto";

export default function NewPayable() {
  const [assignors, setAssignors] = useState<AssignorType[]>([])
  const [newAssignor, setNewAssignor] = useState(false)
  const navigate = useNavigate()
  const {
    register: payableRegister,
    handleSubmit: payableHandleSubmit,
    setError: payableSetError,
    getValues: payableGetValues,
    formState: {
      errors: payableErrors
    },
    setValue
  } = useForm<PayableSchema>({
    resolver: zodResolver(payableSchema),
  })
  const {
    register: assignorRegister,
    handleSubmit: assignorHandleSubmit,
    setError: assignorSetError,
    getValues: assignorGetValues,
    formState: {
      errors: assignorErrors
    }
  } = useForm<AssignorSchema>({
    resolver: zodResolver(assignorSchema),
  })
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const payableData = payableGetValues();
    const assignorData = assignorGetValues();
    if (!newAssignor && !payableData.assignor) {
      payableSetError("root", { message: 'Preencha todos os campos do pagável!' })
      return
    }
    
    if(newAssignor) {
      assignorHandleSubmit(onSubmitAssignor, onErrorAssignor)()
    }
    else {
      payableHandleSubmit(onSubmitPayable, onErrorPayable)()
    }
  }

  const onSubmitAssignor: SubmitHandler<AssignorSchema> = () => {
    payableHandleSubmit(onSubmitPayable, onErrorPayable)()
  }

  const onSubmitPayable: SubmitHandler<PayableSchema> = async () => {
    const payableData = payableGetValues();
    const assignorData = assignorGetValues();
    try {
      const data: PayableType = await createPayable({
        receivableData: {
          value: Number(payableData.value),
          emissionDate: String(payableData.emissionDate),
          assignor: payableData.assignor as UUID
        },
        assignorData
      })
      navigate(`/payable/view/${data.id}`)
    } catch (error) {
      console.log(error)
      payableSetError("root", { message: 'Erro ao cadastrar pagável' })
    }
  }


  const onErrorPayable = () => {
    payableSetError("root", { message: 'Preencha todos os campos do pagável!' })
  }

  const onErrorAssignor = () => {
    if (newAssignor) {
      if (assignorErrors.email)
        assignorSetError("root", { message: 'Preencha corretamente todos os campos do cedente!' })
      else
        assignorSetError("root", { message: 'Preencha todos os campos do cedente!' })
    }
  }

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

        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-3">
          <div className="flex gap-6">
            <PayableFormInputs
              register={payableRegister}
              newAssignor={newAssignor}
              setNewAssignor={setNewAssignor}
              assignors={assignors}
              error={payableErrors.root}
            />
            {
              newAssignor && (
                <AssignorFormInputs
                  register={assignorRegister}
                  error={assignorErrors.root}
                />
              )
            }
          </div>
          <Button type="submit" >Cadastrar</Button>
        </form>

      </FormCard>
    </div>
  )
}