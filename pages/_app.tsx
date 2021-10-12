import type { AppProps } from 'next/app';
import { LoadingIndicator } from '../components/pages/LoadingIndicator';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="">
      <LoadingIndicator/>
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp
