export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-br');
}