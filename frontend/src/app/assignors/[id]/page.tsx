'use client';

import AssignorInfo from "@/components/AssignorInfo";
import Container from "@/components/Container";
import Header from "@/components/Header";
import { Suspense, useEffect, useState } from "react";

const Assignor = ({ params }: {
    params: { id: string }
}) => {

    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);


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