import { TPayableProps } from '../../../types/PayableType'
import FormButtons from '../../buttons/formButtons'
import { Container, FormRegisterPayable } from './styled'

export const RegisterPayable = ({ id, setId, value, setValue, assignor, setAssignor, emissionDate, setEmissionDate, handleSubmit }: TPayableProps) => {
  return (
    <Container>
      <div>
        <h1>Cadastro de recebiveis</h1>
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
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <label htmlFor="value">Valor:</label>
          <input
            type="text"
            id='value'
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            required
          />
          <label htmlFor="cedente">Cedente:</label>
          <input
            type="text"
            id='cedente'
            value={assignor}
            onChange={(e) => setAssignor(e.target.value)}
            required
          />
          <label htmlFor="data">Data: de emissão</label>
          <input
            type="text"
            id='data'
            value={emissionDate}
            onChange={(e) => setEmissionDate(e.target.value)}
            required
          />
          
          <FormButtons />
        </FormRegisterPayable>
      </div>
    </Container>
  )
}