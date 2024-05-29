// LIBS
import { api } from '@/lib/axios';

// INTERFACES
import { IAssignor } from '@/interfaces/assignor.interface';
import { ICreateAssignor } from '@/interfaces/create-assignor.interface';

export const createAssignor = async (data: ICreateAssignor) => {
    return api.post<IAssignor>(`/assignor`, data).then((res) => res.data);
};

export const listAssignors = async () => {
    return api.get<IAssignor[]>(`/assignor`).then((res) => res.data);
};
