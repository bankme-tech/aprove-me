import { useState } from 'react'
import { ContainerRegister, Warnings } from './style'
import { TPayable } from '../../types/PayableType'
import { ModalCreatePayable } from './modal'
import { useDispatch } from 'react-redux'
import { createPayablesAction } from '../../redux/actions/createPayableAction'
import { RegisterPayableForm } from '../../components/forms/payables/RegisterPayable'
import { GetPayableByIdApi } from '../../service/PayableApi'

export const DisplayCreatePayable = () => {

  const dispatch = useDispatch()

  const [id, setId] = useState('')
  const [value, setValue] = useState(0)
  const [assignor, setAssignor] = useState('')
  const [emissionDate, setEmissionDate] = useState('')
  const [error, setError] = useState<string[]>([''])
  const [success, setSuccess] = useState('')
  const [confirm, setConfirm] = useState<boolean>(false)

  const handleRegex = (value: string) => {
    const regexUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    return regexUUID.test(value)
  }

  const handleSubmit = async (payable: TPayable) => {
    try {
      if (!handleRegex(payable.id)) {
        setError(['ID inválido! Insira um ID válido no formato UUID'])
        return
      }

      if (payable.id) {
        const payableById = await GetPayableByIdApi(payable.id)
        if (payableById.id) {
          setError(['O ID fornecido já existe! Insira um ID válido no formato UUID'])
          return
        } 
      }
      
      dispatch(createPayablesAction(payable))

      setConfirm(true)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ContainerRegister>
      <div>
        <RegisterPayableForm
          id={ id }
          setId={ setId }
          value={ value }
          setValue={ setValue }
          assignor={ assignor }
          setAssignor={ setAssignor }
          emissionDate={ emissionDate }
          setEmissionDate={ setEmissionDate }
          handleSubmit={ handleSubmit }
          setError={ setError }
        />
        <Warnings>
          { error && error.map(err => <p key={err} className='error'>{err}</p>) }
          { success && <p className='success'>{success}</p> }
        </Warnings>
        {
         confirm &&
          <ModalCreatePayable
            setConfirm={ setConfirm }
            setSuccess={ setSuccess }
            success={ success }
            confirm={ confirm }                 
          />
          }
      </div>
    </ContainerRegister>
  )
}