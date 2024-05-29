import { Container, FormRegisterAssignor } from './styled'
import { TAssignorProps } from '../../../types/AssignorsType'

export const RegisterAssignorForm = ({ id, setId, document, setDocument, email, serEmail, phone, setPhone, name, setName, handleSubmit, setError }: TAssignorProps) => {

  return (
    <Container>      
      <div>
        <h1>Cadastro de cedentes</h1>
        <FormRegisterAssignor
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit({ id, document, email, phone, name })
          }}
        >
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id='id'
            data-testid='id-register-assignor'
            value={id}
            onChange={ (e) => {
              setId(e.target.value);
              setError([]);
            }}
            required
          />
          <label htmlFor="Name">Nome:</label>
          <input
            type="text"
            id='Name'
            data-testid='name-register-assignor'
            value={name}
            onChange={(e) => setName(String(e.target.value))}
            maxLength={140}
            required
          />
          <label htmlFor="phone">Telefone:</label>
          <input
            type="text"
            id='phone'
            data-testid='phone-register-assignor'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={20}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id='email'
            data-testid='email-register-assignor'
            value={email}
            onChange={(e) => serEmail(e.target.value)}
            maxLength={140}
            required
          />

          <label htmlFor="document">Documento:</label>
          <input
            type="text"
            id='document'
            data-testid='document-register-assignor'
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            maxLength={30}
            required
          />
          <div>
            <button
              type='submit'
              data-testid='submit-register-assignor'
              className='submit'
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
              className='cancel'
              data-testid='reset-register-assignor'
            >
              Limpar
            </button>
          </div>
        </FormRegisterAssignor>
      </div>
    </Container>
  )
}