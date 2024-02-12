'use client';

import PayableInfo from "@/components/PayableInfo";
import Container from "@/components/Container";
import Header from "@/components/Header";
import { Suspense } from "react";

const Payable = ({ params }: {
    params: { id: string }
}) => {

    const token = localStorage.getItem('token');

    return (
        <div>
            <Header />

            <Container>
                <h1 className="font-bold text-2xl">Recebível</h1>

                <Suspense fallback={<div>Carregando...</div>}>
                    <PayableInfo token={token} id={params.id} />
                </Suspense>
            </Container>
        </div>
    )
}

export default Payable;