import { ReactNode } from "react"

const Container = ({children}: {
    children?: ReactNode
}) => {
    return (
        <div className="w-full max-w-screen-xl mx-auto flex flex-col items-start gap-8 p-8">
            {children}
        </div>
    )
}

export default Container;