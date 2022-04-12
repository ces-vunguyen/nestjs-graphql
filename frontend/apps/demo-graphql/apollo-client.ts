import { ApolloClient, InMemoryCache } from '@apollo/client';

export const ssrClient = new ApolloClient({
  uri: 'http://backend:3000/graphql',
  cache: new InMemoryCache(),
});

export const csrClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});
