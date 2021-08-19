import styles from 'src/assets/styles/modules/Chip.module.scss';
import { RemoveCircle } from '@material-ui/icons';

interface Props {
  text: string;
  id: string;
  onClick: (id: string) => void;
}

const Chip: React.VFC<Props> = (props) => {
  return (
    <div className={styles.chip}>
      <div className={styles.contentWrap}>
        <span className={styles.chipText}>{props.text}</span>
        <span
          className={styles.chipIcon}
          onClick={() => props.onClick(props.id)}
        >
          <RemoveCircle fontSize={'inherit'} />
        </span>
      </div>
    </div>
  );
};

export default Chip;
