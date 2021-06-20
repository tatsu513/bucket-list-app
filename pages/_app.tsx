import '../src/assets/styles/reset.css';
import '../src/assets/styles/global.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>BUCKET LIST</title>
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/unicorn_1f984.png"
        />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
