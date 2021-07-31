import { useCallback } from 'react';
import { auth } from 'src/firebase';
import { useRouter } from 'next/router';
import styles from '../assets/styles/modules/Header.module.scss';

const Header = () => {
  const router = useRouter();
  const singOut = useCallback(async () => {
    await auth
      .signOut()
      .then(() => {
        router.push('/account/signin');
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>100 BUCKET LIST</h1>
      <div className={styles.menus}>
        <h2 className={styles.signout} onClick={singOut}>
          サインアウト
        </h2>
        <div className={styles.hamburgerBox}>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </div>
      </div>
    </header>
  );
};

export default Header;
