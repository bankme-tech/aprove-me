import { ToastContainer, toast } from "react-toastify";
import AssignorFormInputs from "../components/assignorFormInputs";
import FormCard from "../components/formCard";
import Button from "../components/ui/button";
import Title from "../components/ui/title";
import { SubmitHandler, useForm } from "react-hook-form";
import { AssignorSchema, assignorSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAssignor } from "../services/assignor";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ui/errorMessage";


export default function NewAssignor() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: {
      errors
    }
  } = useForm<AssignorSchema>({
    resolver: zodResolver(assignorSchema),
  })

  const onSubmit: SubmitHandler<AssignorSchema> = async (data) => {
    try {
      const res = await createAssignor(data);
      toast.loading("Cadastrando cedente...", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      setTimeout(() => {
        navigate(`/assignor/view/${res.id}`, { state: { title: 'Cedente criado:' } });
      }, 1400);
    } catch (error) {
      console.log(error)
      setError("root", { message: 'Erro ao cadastrar pagável' })
    }
  }

  const onError = () => {
    setError("root", { message: 'Preencha todos os campos corretamente!' })
  }

  return (
    <div className="flex flex-col items-center w-full gap-6">
      <Title>Cadastre um Cedente:</Title>

      <FormCard>
        <form onSubmit={handleSubmit(onSubmit,onError)} className="flex flex-col gap-3">
          <AssignorFormInputs
            register={register}
            error={errors.root}
          />

          <Button type="submit" >Cadastrar</Button>
        </form>
      </FormCard>

      <ToastContainer />
    </div>
  )

}