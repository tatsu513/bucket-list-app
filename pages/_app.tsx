import '../src/assets/styles/reset.css';
import '../src/assets/styles/global.scss';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Header, AccountHeader } from '../src/components';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const path = useRouter().pathname;
  const basePath = path.match(/(?<=\/).*(?=\/)/g);
  const isAccountPath = basePath && basePath[0] === 'account';
  return (
    <div>
      <Head>
        <title>BUCKET LIST</title>
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/unicorn_1f984.png"
        />
      </Head>
      {isAccountPath ? <AccountHeader /> : <Header />}
      <main className={isAccountPath ? 'account' : 'home'}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
