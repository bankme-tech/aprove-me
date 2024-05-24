import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-6xl font-bold">404.</h1>
      <h2 className="text-3xl font-bold">Página não encontrada.</h2>
      <p className="text-accent-foreground">
        <Link to="/" className="text-sky-600 dark:text-sky-400">
          Voltar para o painel.
        </Link>
      </p>
    </div>
  )
}
