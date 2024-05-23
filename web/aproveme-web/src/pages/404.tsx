import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div>
      <h1>404.</h1>
      <h2>Página não encontrada.</h2>

      <Link to="/">Voltar para o Dashboard</Link>
    </div>
  )
}
