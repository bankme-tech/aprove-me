// LIBS
import { api } from '@/lib/axios';

// INTERFACES
import { IRegister } from '@/interfaces/register.interface';

export const registerUser = async (data: IRegister) => {
    return api.post<void>(`/auth/register`, data).then((res) => res.data);
};
