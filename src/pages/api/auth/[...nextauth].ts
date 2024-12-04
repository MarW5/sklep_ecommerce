import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"
import * as bcrypt from 'bcrypt';
import type { NextAuthOptions } from "next-auth"
import { authorizeApolloClient } from "@/graphql/appolloClient";
import { GetAccountByEmailDocument, GetAccountByEmailQuery, GetAccountByEmailQueryVariables, useGetAccountByEmailQuery } from "@/generated/graphql";

// declare module 'next-auth' {
//     interface User {
//         id: string;
//         email: string
//     }
//     interface Session {
//         user: User;
//     }
// }

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            if(!credentials) {
                return null;
            }
            const userByEmail = await authorizeApolloClient.query<GetAccountByEmailQuery, GetAccountByEmailQueryVariables>({
                query: GetAccountByEmailDocument,
                variables: {
                    email: credentials?.username,
                }
            })
            console.log('userByEmail', userByEmail)
            if (!userByEmail.data.account?.password) {
                return null;
            }
            const isPasswordValid = await bcrypt.compare(credentials.password,  userByEmail.data.account.password);
            
            if(!isPasswordValid) {
                return null;
            }
            return {
                id: userByEmail.data.account.id,
                email: userByEmail.data.account.email,
            };
        }
    })
    ],
    // callbacks: {
    //     async session({ session, token, user }) {
    //         // Send properties to the client, like an access_token and user id from a provider.
    //         session.accessToken = token.accessToken
    //         session.user.id = token.id
                
    //         return session
    //     },
    //   async redirect({ url, baseUrl }) {
    //     return `${process.env.BASE_URL}/products`
    //   },
    // }
}

export default NextAuth(authOptions)