import { useSelector } from 'react-redux'
import { CreatePayableApi } from '../../service/PayableApi'
import { TPayableRedux } from '../../types/PayableType'
import { ModalContainer } from './style'
import { useState } from 'react'

type ModalCreatePayableProps = {
  success: string
  setSuccess: (e: string) => void
  confirm: boolean
  setConfirm: (e: boolean) => void
}
export const ModalCreatePayable = ({ setConfirm, setSuccess, success, confirm  }: ModalCreatePayableProps) => {

  const reduxCreatePayableConfirm = useSelector((state: TPayableRedux) => state.payablesReduce)
 
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')

  const { id, value, assignor, emissionDate } = reduxCreatePayableConfirm;

  const handleConfirmCreatePayable = async (e: string) => {   
    if (e === 'reset') {
      setConfirm(!confirm)
      return
    }
    setLoading('Criando recebivel...')

    const createPayable = await CreatePayableApi({
      id,
      value,
      assignor,
      emissionDate
    })
    
    if (createPayable.error) {
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
        <p>Valor: { value }</p>
        <p>Cedente: { assignor }</p>
        <p>Data de emissão: { emissionDate }</p>
      </div>
      <div>
        <button
          type='submit'
          onClick={ (e) => handleConfirmCreatePayable(e.currentTarget.type) }
          className='submit'
        >
          Confirmar
        </button>
        <button
          type='reset'
          onClick={ (e) => handleConfirmCreatePayable(e.currentTarget.type) }
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