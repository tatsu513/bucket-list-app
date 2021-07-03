import { Filter, List } from '../src/components';
import styles from 'src/assets/styles/modules/Home.module.scss';

const home = () => {
  return (
    <>
      <Filter />
      <div className={styles.container}>
        <List />
      </div>
    </>
  );
};

export default home;
