import { Filter } from '../src/components';
import styles from 'src/assets/styles/modules/Home.module.scss';

const home = () => {
  return (
    <>
      <Filter />
      <div className={styles.container}></div>
    </>
  );
};

export default home;
