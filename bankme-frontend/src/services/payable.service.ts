// LIBS
import { api } from '@/lib/axios';

// INTERFACES
import { IPayable } from '@/interfaces/payable.interface';
import { ICreatePayable } from '@/interfaces/create-payable.interface';
import { IUpdatePayable } from '@/interfaces/update-payable.interface';

interface UpdatePayableProps {
    payableId: string;
    data: IUpdatePayable;
}

export const createPayable = async (data: ICreatePayable) => {
    return api.post<IPayable>(`/payable`, data).then((res) => res.data);
};

export const updatePayable = async ({
    payableId,
    data,
}: UpdatePayableProps) => {
    return api
        .patch<IPayable>(`/payable/${payableId}`, data)
        .then((res) => res.data);
};

export const listPayable = async () => {
    return api.get<IPayable[]>(`/payable`).then((res) => res.data);
};

export const getPayable = async (payableId: string) => {
    return api.get<IPayable>(`/payable/${payableId}`).then((res) => res.data);
};

export const deletePayable = async (payableId: string) => {
    return api
        .delete<IPayable>(`/payable/${payableId}`)
        .then((res) => res.data);
};
