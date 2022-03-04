import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { AppPropsWithAuth } from '@/types/AuthPages';
import AuthGuard from '@/components/AuthGuard';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithAuth) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <AuthGuard guest={!Component.auth}>
          <Component {...pageProps} />
        </AuthGuard>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
