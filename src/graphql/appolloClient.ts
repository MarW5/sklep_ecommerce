import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: `${process.env.GRAPH_CMS_URL}`,
    cache: new InMemoryCache(),
  });

  export const authorizeApolloClient = new ApolloClient({
    uri: `${process.env.GRAPH_CMS_URL}`,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    }
  })