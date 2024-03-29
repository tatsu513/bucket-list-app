import { useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from '../assets/styles/modules/Header.module.scss';
import { Sidebar } from 'src/components';
import { useState } from 'react';

interface Props {
  username?: string;
}

const Header: React.VFC<Props> = (props) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const router = useRouter();
  const close = useCallback(() => {
    setIsOpenSidebar(false);
  }, []);
  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={() => router.push('/')}>
        100 BUCKET LIST
      </h1>
      <div className={styles.menus}>
        <h2 className={styles.signout} onClick={() => router.push('/profile')}>
          {props.username && `${props.username} さん`}
        </h2>
        <div
          className={styles.hamburgerBox}
          onClick={() => setIsOpenSidebar(!isOpenSidebar)}
        >
          <span
            className={`${styles.bar} ${styles.barTop} ${
              isOpenSidebar && styles.isOpen
            }`}
          />
          <span
            className={`${styles.bar} ${styles.barMiddle} ${
              isOpenSidebar && styles.isOpen
            }`}
          />
          <span
            className={`${styles.bar} ${styles.barBottom} ${
              isOpenSidebar && styles.isOpen
            }`}
          />
        </div>
      </div>
      <Sidebar isOpen={isOpenSidebar} close={close} />
    </header>
  );
};

export default Header;
