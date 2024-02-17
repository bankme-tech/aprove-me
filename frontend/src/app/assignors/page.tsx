import AddAssignorButton from "@/components/AddAssignorButton";
import AssignorsList from "@/components/AssignorsList";
import Container from "@/components/Container";
import Header from "@/components/Header";
import { Suspense } from "react";

const Assignors = () => {
    return (
        <div>
            <Header />

            <Container>
                <div className="w-full flex items-center justify-between">
                    <h1 className="font-bold text-2xl">Cedentes</h1>

                    <AddAssignorButton />
                </div>

                <Suspense fallback={<div>Carregando...</div>}>
                    <AssignorsList />
                </Suspense>
            </Container>
        </div>
    )
}

export default Assignors;