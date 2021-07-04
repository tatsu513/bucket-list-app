import styles from 'src/assets/styles/modules/FloatButton.module.scss';
import { Add } from '@material-ui/icons';

interface Props {
  text: string;
  onClick: () => void;
}
const FloatButton: React.VFC<Props> = (props) => {
  return (
    <button className={styles.floatButton}>
      <span className={styles.beforeIcon}>
        <Add />
      </span>
      <span className={styles.buttonText} onClick={props.onClick}>
        {props.text}
      </span>
    </button>
  );
};

export default FloatButton;
