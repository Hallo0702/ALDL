import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import '../../styles/globals.css';
import Layout from '../components/common/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
