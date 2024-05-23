import { AssignorPath } from "./(components)/assignor-path";
import { AssignorDetails } from "./(components)/assignor-details";
import { Suspense } from "react";

interface AssignorProps {
    params: { id: string }
}

export default async function Assignor({ params }: AssignorProps) {
    return (
        <div className="space-y-2">
            <section className="flex flex-col items-start space-y-2">
                <AssignorPath />
                <div>
                    <h1 className="text-lg">Cedente</h1>
                    <p className="text-sm text-muted-foreground">Aqui você pode visualizar as informações do seu cedente.</p>
                </div>
            </section>

            <hr />

            <Suspense>
                <AssignorDetails assignorId={params.id} />
            </Suspense>
        </div>
    );
  }
  