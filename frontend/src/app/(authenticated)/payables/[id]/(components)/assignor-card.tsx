import { Assignor } from "@/common/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getNameInitials } from "@/lib/utils"
import Link from "next/link"
import React from "react"

interface AssignorCardProps {
    assignor: Assignor
}

export const AssignorCard: React.FunctionComponent<AssignorCardProps> = ({assignor}) => (
    <section>
        <h2>Cedente</h2>

        <div className="flex items-start space-x-4 rounded-md border p-4 w-full sm:w-fit">
            <Avatar>
                <AvatarFallback>{getNameInitials(assignor.name)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
                {assignor.name}
            </p>
            <p className="text-sm text-muted-foreground">
                {assignor.email}
            </p>

            <Button className="w-fit sm:w-full" size='sm' variant='ghost'>
                <Link href={`/assignors/${assignor.id}`}>
                    Acessar informações
                </Link>
            </Button>
            </div>
        </div>
    </section>
)