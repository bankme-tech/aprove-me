import { useState } from 'react'
import FormButtons from '../../buttons/formButtons'
import {
  FormContent,
  FormLoginStyle,
  MsgContainer,
} from './style'
import { LoginApi } from '../../../service/UserApi'

export const FormLogin = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await LoginApi({ login, password })
      if (response.token) {
        localStorage.setItem('token', response.token)
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          window.location.href = '/home'
        }, 2000)
        return;
      }      
      setLoading(false)
      setError(true)
      setErrorMsg('Usuário ou senha inválidos!')
    } catch (error) {
      console.log(error)
    }
  }

    return (
      <FormLoginStyle
        onSubmit={(e) => handleLogin(e)}
      >
      <FormContent>
        <label htmlFor="login">Login:</label>
        <input
          type="login"
          id="login"
          name="login"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
            setError(false);
          }}
          required
        />
      </FormContent>
      <FormContent>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          required
        />
      </FormContent>
      <div>
        <FormButtons />
      </div>
      { 
        loading && 
        <MsgContainer>
          <p className='success'>Logado. Redirecionando...</p> 
        </MsgContainer>
      }
      { 
        error && 
        <MsgContainer>
          <p className='error'>{ errorMsg }</p> 
        </MsgContainer>
      }
    </FormLoginStyle>
    )
}