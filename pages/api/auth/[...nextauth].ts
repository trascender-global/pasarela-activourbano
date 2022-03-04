import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import ky from '@lib/ky'

export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 30,
    },
    providers: [
        CredentialsProvider({
            credentials: {
                id: { type: 'text', label: 'Documento de identidad' }
            },
            async authorize(credentials) {
                try {
                    const res: any = await ky
                        .post('Login/Login/ActivoUrbano', {
                            json: { username: credentials?.id, password: credentials?.id.slice(-4) },
                        })
                        .json();
                    const token = res.data

                    return {
                        token
                    }
                } catch (error) {
                    return null
                }
            },
        })
    ],
    callbacks: {
        jwt({ user, token }) {
            if (user) {
                token.accessToken = user.token
            }
            return token
        },
        session({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken
            }
            return session
        }
    },
    pages: {
        signIn: '/auth/login'
    },
})