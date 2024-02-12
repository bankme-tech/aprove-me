'use client'

import AddPayableButton from "@/components/AddPayableButton";
import Container from "@/components/Container";
import Header from "@/components/Header"
import PayablesList from "@/components/PayablesList";
import { Suspense } from "react";

const Payables = () => {

    const token = localStorage.getItem('token');

    if(!token) return

    return (
        <div>
            <Header />

            <Container>
                <div className="w-full flex items-center justify-between">
                    <h1 className="font-bold text-2xl">Recebíveis</h1>

                    <AddPayableButton />
                </div>

                <Suspense fallback={<div>Carregando...</div>}>
                    <PayablesList token={token} />
                </Suspense>
            </Container>
        </div>
    )
}

export default Payables;