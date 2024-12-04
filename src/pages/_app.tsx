import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../graphql/appolloClient';
import { CartStateContextProvider } from '@/components/Cart/CartContext';
const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <CartStateContextProvider>
                <ApolloProvider client={apolloClient}>
                <QueryClientProvider client={queryClient}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </QueryClientProvider>
                </ApolloProvider>
            </CartStateContextProvider>
        </SessionProvider>
    )
}
