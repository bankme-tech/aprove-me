'use client'

import AddPayableButton from "@/components/AddPayableButton";
import Container from "@/components/Container";
import Header from "@/components/Header"
import PayablesList from "@/components/PayablesList";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { Suspense, useEffect, useRef, useState } from "react";

const Payables = () => {
    const toastRef = useRef<any>();

    const router = useRouter();

    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token) {
            router.push('/');
            return;
        }
        
        setToken(token);
    }, []);

    const showToast = (severity: string, summary: string, detail: string) => {
        toastRef.current.show({severity, summary, detail});
    }

    return (
        <div>
            <Toast ref={toastRef} />

            <Header />

            <Container>
                <div className="w-full flex items-center justify-between">
                    <h1 className="font-bold text-2xl">Recebíveis</h1>

                    <AddPayableButton />
                </div>

                <Suspense fallback={<div>Carregando...</div>}>
                    {token && <PayablesList token={token} router={router} showToast={showToast}/>}
                </Suspense>
            </Container>
        </div>
    )
}

export default Payables;