import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';

// LIBS
import { serverSideApi } from './axios';

// INTERFACES
import { IUser } from '@/interfaces/user.interface';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 12,
    },
    jwt: {
        maxAge: 60 * 60 * 12,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'email',
                    placeholder: 'your@email.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials, req) => {
                if (!credentials) {
                    throw new Error('Invalid data');
                }
                try {
                    const { token } = await serverSideApi
                        .post<{ token: string }>(`/auth/login`, credentials)
                        .then((res) => res.data);

                    if (!token) {
                        throw new Error('Invalid credentials');
                    }

                    const user = jwtDecode<IUser>(token);

                    return Promise.resolve({
                        ...user,
                        token,
                    } as IUser);
                } catch (error: any) {
                    console.error(error);
                    if (
                        error.message.includes('Network Error') ||
                        error.message.includes('connect ECONNREFUSED')
                    ) {
                        throw new Error('Unable to connect to the server');
                    }

                    const errorMsg =
                        error.response?.data.message || error.message || error;

                    throw new Error(errorMsg);
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user = token.user as IUser;
            }
            return session;
        },
    },
};

export const getAuthSession = () => getServerSession(authOptions);
