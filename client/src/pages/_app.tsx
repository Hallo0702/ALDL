import type { AppProps } from 'next/app';
import '../../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-20">
      <Component {...pageProps} />;
    </div>
  );
}

export default MyApp;
