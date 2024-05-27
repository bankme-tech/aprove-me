import { useState } from 'react'
import FormButtons from '../../buttons/formButtons'
import {
  FormContent,
  FormLoginStyle,
  MsgContainer,
} from './style'
import { GetProfileApi, LoginApi } from '../../../service/UserApi'

export const FormLogin = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchUserData = async (token: string) => {
    try {
      const response = await GetProfileApi(token)
   
      if (response.id && response.login) {
        const date = new Date()
        const userData = {
          id: response.id,
          login: response.login,
          date,
        }
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setLoading('Logado com sucesso! Redirecionando...')
        setTimeout(() => {
          setLoading('')
          window.location.href = '/home'
        }, 2000)
        return;
      } 
      setLoading('Erro ao logar!')
      setError(true)
      setErrorMsg('Usuário ou senha inválidos!')
      return;
    } catch (error) {
      setError(true)
      setErrorMsg('Erro ao logar!')
      console.log(error)
    } 
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await LoginApi({ login, password })
      if (response.token) {
        setLoading('Logando...')
        await fetchUserData(response.token)
      } 
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
          <p className='success'>{ loading }</p> 
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