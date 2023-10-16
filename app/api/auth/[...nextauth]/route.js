import { loginUser } from "@/app/controllers/usersController";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@email.com", required: true},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (credentials.email && credentials.password ) {
                    const user = await loginUser(credentials.email, credentials.password);
                    if (user) {
                        user.authenticated = true
                        return { ...user, returnTo: '/profile' };
                    }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login',
      },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        maxAge: 24 * 60 * 60,
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    callbacks: {
        jwt({ token, user, session, trigger }) {
            // console.log('jwt', token, user, session, trigger)
            if (trigger === 'update' && session?.username && session?.email) {
                token.username = session.username;
                token.email = session.email;
            }

            if(user) {
                return {
                    ...token,
                    id: user._id,
                    file: user.file,
                    username: user.username,
                };
            }
            return token
        },
        session({ session, token, user }) {
            // console.log('session', session, token, user)
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    file: token.file,
                    username: token.username,
                    email: token.email,
                }
            };
        },    
    },
}

const hendler = NextAuth(authOptions)

export {hendler as GET, hendler as POST}