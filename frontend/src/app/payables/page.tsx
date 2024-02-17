import AddPayableButton from "@/components/AddPayableButton";
import PayablesList from "@/components/PayablesList";
import Container from "@/components/Container";
import Header from "@/components/Header";
import { Suspense } from "react";

const Payables = () => {
    return (
        <div>
            <Header />

            <Container>
                <div className="w-full flex items-center justify-between">
                    <h1 className="font-bold text-2xl">Recebíveis</h1>

                    <AddPayableButton />
                </div>

                <Suspense fallback={<div>Carregando...</div>}>
                    <PayablesList />
                </Suspense>
            </Container>
        </div>
    )
}

export default Payables;