import NextAuth, { DefaultSession } from 'next-auth';

// INTERFACES
import { IRequestUser } from '@/interfaces/request-user.interface';

declare module 'next-auth' {
    interface Session {
        user?: IRequestUser & DefaultSession['user'];
    }
}
