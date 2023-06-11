import '../styles/globals.css';
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../graphql/appolloClient';
import { CartStateContextProvider } from '@/components/Cart/CartContext';
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CartStateContextProvider>
            <ApolloProvider client={apolloClient}>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </QueryClientProvider>
            </ApolloProvider>
        </CartStateContextProvider>
    )
}
