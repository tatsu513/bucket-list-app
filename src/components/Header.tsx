import styles from '../assets/styles/modules/Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>100 BUCKET LIST</h1>
      <div className={styles.hamburgerBox}>
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </div>
    </header>
  );
};

export default Header;
