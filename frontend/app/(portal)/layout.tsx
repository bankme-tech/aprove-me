import { ReactNode } from "react";
import Container from "./_components/Container";
import Link from "next/link";
import { Button } from "primereact/button";

const PortalLayout = async ({ children }: {
    children: ReactNode
}) => {
    return (
        <>
            <header className="flex justify-end p-4 bg-[--primary] text-white">
                <nav className="flex items-center justify-end gap-10">
                    <Link href="/assignors">Cedentes</Link>
                    <Link href="/payables">Recebíveis</Link>
                    <Button 
                        className="p-button-link text-white"
                        icon="pi pi-sign-out"
                    />
                </nav>
            </header>
            <Container>
                {children}
            </Container>
        </>
    )
}

export default PortalLayout;