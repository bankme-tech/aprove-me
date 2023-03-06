import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        console.log("As credenciais são.....", credentials)

        const res = await fetch(process.env.API_URL + "/api/auth/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        console.log('res', res)
        const user = await res.json()
  
        if (res.ok && user) {
          console.log('Usuário correto...', user)
          return user
        }
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    // signUp: '/auth/signup',
    // signOut: '/auth/signout',
  },
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user);
        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user; 
        return session;
      },
  },
}

export default NextAuth(authOptions)