import { Container, FormRegisterPayable } from './styled'
import { TAssignorProps } from '../../../types/AssignorsType'

export const RegisterAssignorForm = ({ id, setId, document, setDocument, email, serEmail, phone, setPhone, name, setName, handleSubmit, setError }: TAssignorProps) => {

  return (
    <Container>      
      <div>
        <h1>Cadastro de cedentes</h1>
        <FormRegisterPayable
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit({ id, document, email, phone, name })
          }}
        >
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id='id'
            value={id}
            onChange={ (e) => {
              setId(e.target.value);
              setError([]);
            }}
            required
          />
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            id='Name'
            value={name}
            onChange={(e) => setName(String(e.target.value))}
            maxLength={140}
            required
          />
          <label htmlFor="phone">Telefone:</label>
          <input
            type="text"
            id='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={20}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id='email'
            value={email}
            onChange={(e) => serEmail(e.target.value)}
            maxLength={140}
            required
          />

          <label htmlFor="document">Documento:</label>
          <input
            type="text"
            id='document'
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            maxLength={30}
            required
          />
          <div>
            <button
              type='submit'
            >
              Cadastrar
            </button>
            <button
              type='reset'
              onClick={() => {
                setId('')
                setDocument('')
                serEmail('')
                setPhone('')
                setName('')
              }}
            >
              Limpar
            </button>
          </div>
        </FormRegisterPayable>
      </div>
    </Container>
  )
}