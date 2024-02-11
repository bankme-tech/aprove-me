import { ReactNode } from "react"

const Container = ({children}: {
    children?: ReactNode
}) => {
    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col items-start gap-4 p-4">
            {children}
        </div>
    )
}

export default Container;