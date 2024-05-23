export function getToken(){
    if(typeof window === 'undefined') return null

    return localStorage.getItem('token')
}

export function saveToken(token: string){
    if(typeof window === 'undefined') return null

    return localStorage.setItem('token', token)
}

export function removeToken(){
    if(typeof window === 'undefined') return

    localStorage.removeItem('token')
}