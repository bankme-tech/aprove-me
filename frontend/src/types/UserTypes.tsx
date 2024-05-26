export type TUser = {
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