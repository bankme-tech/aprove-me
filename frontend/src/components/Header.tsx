'use client';

import Image from "next/image";
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

            <header className="bg-white shadow-md flex justify-center">
                <div className="max-w-screen-xl w-full flex items-center justify-between py-4 px-8 text-[--primary]">
                    <Image src="/logo-bankme.png" alt="bankme" className="w-auto h-10" width={913} height={1080} />

                    <nav className="flex items-center justify-end gap-10">
                        <Link href="/assignors">Cedentes</Link>
                        <Link href="/payables">Recebíveis</Link>
                        <Button
                            className="p-button-link"
                            icon="pi pi-sign-out"
                            onClick={handleOnClick}
                        />
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header;