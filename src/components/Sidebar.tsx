import styles from 'src/assets/styles/modules/Sidebar.module.scss';
import { Settings, ExitToApp } from '@material-ui/icons';
import { useCallback } from 'react';
import { auth } from 'src/firebase';
import { useRouter } from 'next/router';

interface Props {
  isOpen: boolean;
  close: () => void;
}

const Sidebar: React.VFC<Props> = (props) => {
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
    <div
      className={`${styles.sidebarWrap} ${props.isOpen && styles.isOpen}`}
      onClick={() => props.close()}
    >
      <div
        className={`${styles.sidebarBox} ${props.isOpen && styles.isOpen}`}
        onClick={(event) => event.stopPropagation()}
      >
        <ul>
          <li className={styles.sidebarItem}>
            <span className={styles.iconBox}>
              <Settings />
            </span>
            <span className={styles.textBox}>設定</span>
          </li>
          <li className={styles.sidebarItem} onClick={() => singOut()}>
            <span className={styles.iconBox}>
              <ExitToApp />
            </span>
            <span className={styles.textBox}>サインアウト</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
