import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization:`Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
      },
    };
  });
  
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPH_CMS_URL,
  });
  
export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  export const authorizeApolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPH_CMS_URL,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    },
  })