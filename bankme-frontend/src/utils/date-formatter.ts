export function formatDate(value: string) {
    const date = new Date(value)
    const formatter = new Intl.DateTimeFormat()
    return formatter.format(date)
}