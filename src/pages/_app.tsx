import '../styles/globals.css';
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../graphql/appolloClient';
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div>
            <ApolloProvider client={apolloClient}>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </QueryClientProvider>
            </ApolloProvider>
        </div>
    )
}
