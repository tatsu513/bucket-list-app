import styles from 'src/assets/styles/modules/FloatButton.module.scss';
import { Add } from '@material-ui/icons';
const FloatButton = () => {
  return (
    <button className={styles.floatButton}>
      <span className={styles.beforeIcon}>
        <Add />
      </span>
      <span className={styles.buttonText}>アイテムを追加</span>
    </button>
  );
};

export default FloatButton;
