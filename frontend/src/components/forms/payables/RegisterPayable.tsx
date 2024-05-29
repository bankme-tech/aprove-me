import { useEffect, useState } from 'react'
import { TPayableProps } from '../../../types/PayableType'
import FormButtons from '../../buttons/formButtons'
import { Container, FormRegisterPayable } from './styled'
import { GetAllAssignorsApi } from '../../../service/assignorsApi'
import { TAssignors } from '../../../types/AssignorsType'

export const RegisterPayableForm = ({ id, setId, value, setValue, assignor, setAssignor, emissionDate, setEmissionDate, handleSubmit, setError }: TPayableProps) => {
  const [fetchAssignor, setFetchAssignor] = useState([])

  useEffect(() => {
    fetchAssignors()
  }, [])

  const fetchAssignors = async () => {
    const response = await GetAllAssignorsApi()    
    setFetchAssignor(response)
  }

  return (
    <Container>      
      <div>
        <h1>Cadastro de pagáveis</h1>
        <FormRegisterPayable
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit({ id, assignor, value, emissionDate })
          }}
        >
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id='id'
            data-testid='id-payable'
            value={id}
            onChange={ (e) => {
              setId(e.target.value);
              setError([]);
            }}
            required
          />
          <label htmlFor="value">Valor:</label>
          <input
            type="number"
            id='value'
            data-testid='value-payable'
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            required
          />
          <label htmlFor="cedente">Cedente:</label>
          <select
            id="cedente"
            value={assignor}
            onChange={(e) => {
              setAssignor(e.target.value);
              setError([]);
            }}
            required
          >
            <option value="" disabled>Selecione um cedente</option>
              {
                fetchAssignor.map((as: TAssignors) => {
                  return (
                    <option key={as.id} value={as.id}>{as.name}</option>
                  )
                })
              }
          </select>
          <label htmlFor="data">
            Data de emissão:
          </label>
          <input
            type="date"
            id='data'
            value={emissionDate}
            onChange={(e) => setEmissionDate(e.target.value)}
            required
          />
          
          <FormButtons
            setAssignor={setAssignor}
            setId={setId}
            setValue={setValue}
            setEmissionDate={setEmissionDate}
          />
        </FormRegisterPayable>
      </div>
    </Container>
  )
}