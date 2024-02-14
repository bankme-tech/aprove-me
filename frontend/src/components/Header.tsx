'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const Header = () => {
    const router = useRouter();

    const accept = () => {
        localStorage.removeItem('token');
        router.push('/');
    }

    const handleOnClick = () => {
        confirmDialog({
            message: 'Deseja realmente sair?',
            header: 'Alerta',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            acceptLabel: 'Sim',
            rejectLabel: 'Não'
        });
    }

    return (
        <>
            <ConfirmDialog />

            <header className="flex justify-end p-4 bg-[--primary] text-white">
                <nav className="flex items-center justify-end gap-10">
                    <Link href="/assignors">Cedentes</Link>
                    <Link href="/payables">Recebíveis</Link>
                    <Button
                        className="p-button-link text-white"
                        icon="pi pi-sign-out"
                        onClick={handleOnClick}
                    />
                </nav>
            </header>
        </>
    )
}

export default Header;