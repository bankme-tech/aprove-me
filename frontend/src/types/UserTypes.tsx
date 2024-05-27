export type TUser = {
    id?: number
    login: string
    password: string
}

export type UserProps = {
    login: string
    password: string
    setLogin: (login: string) => void
    setPassword: (password: string) => void
    handleLogin: () => void
}
