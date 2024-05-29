// LIBS
import { api } from '@/lib/axios';

// INTERFACES
import { ICreatePayable } from '@/interfaces/create-payable.interface';
import { IPayable } from '@/interfaces/payable.interface';

export const createPayable = async (data: ICreatePayable) => {
    return api.post<IPayable>(`/payable`, data).then((res) => res.data);
};

export const listPayable = async () => {
    return api.get<IPayable[]>(`/payable`).then((res) => res.data);
};

export const deletePayable = async (payableId: string) => {
    return api
        .delete<IPayable>(`/payable/${payableId}`)
        .then((res) => res.data);
};
