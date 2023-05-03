import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clh667k5z6pgp01t8764r5pol/master',
    cache: new InMemoryCache(),
  });
