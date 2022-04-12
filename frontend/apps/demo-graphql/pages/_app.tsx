import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import './styles.css';
import { csrClient } from '../apollo-client';
import { ClientOnly } from '../components/ClientOnly';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={csrClient}>
      <Head>
        <title>Welcome to demo-graphql!</title>
      </Head>
      <main className="app">
        <ClientOnly>
          <Component {...pageProps} />
        </ClientOnly>
      </main>
    </ApolloProvider>
  );
}

export default CustomApp;
