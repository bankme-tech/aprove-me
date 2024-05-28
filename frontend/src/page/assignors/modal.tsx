import { useSelector } from 'react-redux'
import { useState } from 'react'
import { ModalContainer } from '../payables/style'
import { TAssignorsRedux } from '../../types/AssignorsType'
import { CreateAssignorApi } from '../../service/assignorsApi'

type ModalCreateAssignorProps = {
  success: string
  setSuccess: (e: string) => void
  confirm: boolean
  setConfirm: (e: boolean) => void
}
export const ModalCreateAssignor = ({ setConfirm, setSuccess, success, confirm  }: ModalCreateAssignorProps) => {

  const reduxCreateAssignorConfirm = useSelector((state: TAssignorsRedux) => state.assignorReduce)
  console.log(reduxCreateAssignorConfirm)
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')

  const { id, document, email, name, phone } = reduxCreateAssignorConfirm;

  const handleConfirmCreateAssignor = async (e: string) => {   
    if (e === 'reset') {
      setConfirm(!confirm)
      return
    }
    setLoading('Criando recebivel...')

    const createAssignor = await CreateAssignorApi({
      id,
      document,
      email,
      name,
      phone
    })
    
    if (createAssignor.error) {
      setError('Erro ao criar recebivel! Tente novamente.')
      setLoading('')
      setSuccess('')
      setConfirm(!confirm)
      return
    }
    
    setLoading('')
    setSuccess('Recebivel criado com sucesso!')
    setTimeout(() => (
      setSuccess(''),
      window.location.reload()
    ), 3000)

  }

  return (
    <ModalContainer>
      <h2>Confirmar criação do recebível?</h2>
      <div>
        <p>ID: { id }</p>
        <p>Documento: { document }</p>
        <p>Email: { email }</p>
        <p>Nome: { name }</p>
        <p>Telefone: { phone }</p>
      </div>
      <div>
        <button
          type='submit'
          onClick={ (e) => handleConfirmCreateAssignor(e.currentTarget.type) }
          className='submit'
        >
          Confirmar
        </button>
        <button
          type='reset'
          onClick={ (e) => handleConfirmCreateAssignor(e.currentTarget.type) }
          className='cancel'
        >
          Cancelar
        </button>
      </div>
      { loading && <p className='loadin'>{ loading }</p> }
      { error && <p className='error'>{ error }</p> }
      { success && <p className='success'>{ success }</p> }
    </ModalContainer>
  )
}