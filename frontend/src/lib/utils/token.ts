export function getToken(){
    return localStorage.getItem('token')
}

export function saveToken(token: string){
    return localStorage.setItem('token', token)
}

export function removeToken(){
    localStorage.removeItem('token')
}