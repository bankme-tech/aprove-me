import NextAuth from 'next-auth';

// AUTH
import { authOptions } from '@/lib/nextauth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
