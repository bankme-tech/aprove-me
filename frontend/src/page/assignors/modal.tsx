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
export const PageCreateAssignorModal = ({ setConfirm, setSuccess, success, confirm  }: ModalCreateAssignorProps) => {

  const reduxCreateAssignorConfirm = useSelector((state: TAssignorsRedux) => state)

  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')

  const ReduxAssignors = reduxCreateAssignorConfirm.assignorReduce && reduxCreateAssignorConfirm.assignorReduce || {};

  const { id, document, email, name, phone } = ReduxAssignors

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
      <div data-testid='modal-assignor-info'>
        <p>ID: { id }</p>
        <p>Documento: { document }</p>
        <p>Email: { email }</p>
        <p>Nome: { name }</p>
        <p>Telefone: { phone }</p>
      </div>
      <div>
        <button
          type='submit'
          data-testid='modal-assignor-submit'
          onClick={ (e) => handleConfirmCreateAssignor(e.currentTarget.type) }
          className='submit'
        >
          Confirmar
        </button>
        <button
          type='reset'
          data-testid='modal-assignor-cancel'
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