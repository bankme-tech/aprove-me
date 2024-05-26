'use client';
import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom"

export default function LoginButton() {
    const { pending } = useFormStatus()
   
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (pending) event.preventDefault()
    }
   
    return (
        <Button
            type="submit"
            className="w-full"
            color="primary"
            isLoading={pending}
            isDisabled={pending}
            onClick={handleClick}
        >
            Logar
        </Button>
    )
}