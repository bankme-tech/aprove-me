'use client';

import AssignorInfo from "@/components/AssignorInfo";
import Container from "@/components/Container";
import Header from "@/components/Header";
import { Suspense } from "react";

const Assignor = ({ params }: {
    params: { id: string }
}) => {

    const token = localStorage.getItem('token');

    return (
        <div>
            <Header />

            <Container>
                <h1 className="font-bold text-2xl">Cedente</h1>

                <Suspense fallback={<div>Carregando...</div>}>
                    <AssignorInfo token={token} id={params.id} />
                </Suspense>
            </Container>
        </div>
    )
}

export default Assignor;