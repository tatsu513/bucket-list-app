import '../src/assets/styles/reset.css';
import '../src/assets/styles/global.scss';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AccountHeader, Header } from '../src/components';
import { auth } from 'src/firebase';
import { getUser } from 'src/api';
import { User } from 'src/types';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = useRouter().pathname;
  const isAccountPath = path.includes('account');

  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/account/signin');
    });
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    getUser(currentUser.uid).then((user) => setUser(user));
  }, [currentUser]);
  return (
    <div>
      <Head>
        <title>BUCKET LIST</title>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/unicorn_1f984.png"
        />
      </Head>
      {isAccountPath ? <AccountHeader /> : <Header username={user?.username} />}
      <main className={isAccountPath ? 'account' : 'home'}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
