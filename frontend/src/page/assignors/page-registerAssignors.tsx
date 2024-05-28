import { useState } from 'react';
import { RegisterAssignorForm } from '../../components/forms/cedente/RegisterAssignor';
import { GetAssignorByIdApi } from '../../service/assignorsApi';
import { TAssignors } from '../../types/AssignorsType';
import { ModalCreateAssignor } from './modal';
import { useDispatch } from 'react-redux';
import { createAssignorsAction } from '../../redux/actions/createAssignorAction';

export const DisplayCreateAssignors = () => {
  const dispatch = useDispatch()

  const [id, setId] = useState('')
  const [document, setDocument] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string[]>([])
  const [confirm, setConfirm] = useState(false)
  const [success, setSuccess] = useState('')

  const handleRegex = (value: string) => {
    const regexUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    return regexUUID.test(value)
  }

  const handleSubmit = async (payable: TAssignors) => {
    try {
      if (!handleRegex(payable.id)) {
        setError(['ID inválido! Insira um ID válido no formato UUID'])
        return
      }

      if (payable.id) {
        const payableById = await GetAssignorByIdApi(payable.id)
        if (payableById.id) {
          setError(['O ID fornecido já existe! Insira um ID válido no formato UUID'])
          return
        } 
      }
      
      dispatch(createAssignorsAction(payable))

      setError([])

      
      setConfirm(true)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div>
        <RegisterAssignorForm 
          id={id}
          setId={setId}
          document={document}
          setDocument={setDocument}
          email={email}
          serEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          name={name}
          setName={setName}
          handleSubmit={ handleSubmit }
          setError={setError}
        />
      </div>

      {
      confirm &&
        <ModalCreateAssignor
          setSuccess={setSuccess}
          success={success}
          confirm={confirm}
          setConfirm={setConfirm}
        />
      }

      <div>
        {error.map(e => <p className='error'>{e}</p>)}
      </div>
    </div>
  );
}