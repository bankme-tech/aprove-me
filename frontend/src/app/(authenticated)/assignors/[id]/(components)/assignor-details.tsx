'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RedirectType, redirect } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { listAssignorById } from '@/lib/server/routes/list-assignor-by-id'
import { toast } from 'sonner'

interface AssignorDetailsProps {
    assignorId: string
}

export const AssignorDetails: React.FunctionComponent<AssignorDetailsProps> = ({ assignorId }) => {
    const token = localStorage.getItem('token')
    
    if(!token) redirect('/', RedirectType.replace)

    const { data: assignor, isLoading } = useQuery({
        queryKey: ['assignors', assignorId],
        queryFn: () => listAssignorById(assignorId, { token }),
        retry: false,
        refetchOnWindowFocus: false
    })

    if(!assignor && !isLoading){
        toast.error('Cedente não encontrado.')
        redirect('/assignors', RedirectType.push)
    }

    if(isLoading) return <div>Carregando...</div>
    
    return (
        <div className='space-y-4'>
            <div>
                <Label htmlFor='assignor-id'>ID</Label>
                <Input value={assignor?.id} name='assignor-id' disabled />
            </div>

            <div>
                <Label htmlFor='assignor-name'>Nome</Label>
                <Input value={assignor?.name} name='assignor-name' disabled />
            </div>

            <div>
                <Label htmlFor='assignor-email'>Email</Label>
                <Input value={assignor?.email} name='assignor-email' disabled />
            </div>

            <div>
                <Label htmlFor='assignor-phone'>Telefone</Label>
                <Input value={assignor?.phone} name='assignor-phone' disabled />
            </div>

            <div>
                <Label htmlFor='assignor-document'>Documento</Label>
                <Input value={assignor?.document} name='assignor-document' disabled />
            </div>

        </div>
    )
}