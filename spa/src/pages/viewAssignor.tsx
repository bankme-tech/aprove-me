import { UUID } from "crypto";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AssignorSchema, assignorSchema } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAssignor, editAssignor, getAssignor } from "../services/assignor";
import Title from "../components/ui/title";
import FormCard from "../components/formCard";
import ErrorMessage from "../components/ui/errorMessage";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { ToastContainer, toast } from "react-toastify";


export default function ViewAssignor() {
  const { id } = useParams<{ id: UUID }>();
  const location = useLocation();
  const title = location.state?.title;
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: {
      errors,
      defaultValues,
      isDirty
    },
  } = useForm<AssignorSchema>({
    resolver: zodResolver(assignorSchema),
    defaultValues: async () => await getAssignor(id as UUID)
  })

  const onSubmit: SubmitHandler<AssignorSchema> = async (data) => {
    if (
      data.email === defaultValues?.email &&
      data.name === defaultValues.name &&
      data.phone === defaultValues.phone
    ) {
      reset();
      return
    }
    
    try {
      const res = await editAssignor({...data, id})
      toast.success("Alterações salvas", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } catch (error) {
      setError("root", { message: 'Erro ao salvar as alterações.' })
    }
  }

  const onError = () => {
    setError("root", { message: 'Preencha todos os campos corretamente para salvar.' })
  }

  // const onDelete = async () => {
  //   try {
  //     const res = await deleteAssignor(id as UUID)
  //     toast.success("Cedente apagado", {
  //       position: "top-center",
  //       autoClose: 800,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light"
  //     });
  //     setTimeout(() => {
  //       navigate(-1);
  //     }, 850);
  //   } catch (error) {
  //     setError("root", { message: 'Erro ao apagar o pagável.' })
  //   }
  // }


  return (
    <div className='flex flex-col items-center w-full gap-6'>
      <Title>{title}</Title>

      <FormCard>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-3">
          <ErrorMessage error={errors.root} />
          <Input
            label='Id'
            value={id}
            disabled
          />
          <Input
            label="CPF ou CNPJ do Cedente"
            placeholder="CPF ou CNPJ"
            register={register('document')}
            disabled
          />
          <Input
            label="Email do Cedente"
            placeholder="Email"
            register={register('email')}
          />
          <Input
            label="Telefone do cedente"
            placeholder="Telefone"
            register={register('phone')}
          />
          <Input
            label="Nome do cedente"
            placeholder="Nome"
            register={register('name')}
          />
          <Button
            disabled={!isDirty}
          >
            Salvar alterações
          </Button>
        </form>
      </FormCard>

      <ToastContainer />
    </div>
  )

}