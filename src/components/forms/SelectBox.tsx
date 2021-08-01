import { Options } from 'src/types';
import styles from '../../assets/styles/modules/SelectBox.module.scss';
interface Props {
  id?: string;
  label: string;
  options: Options[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const SelectBox: React.VFC<Props> = (props) => {
  return (
    <>
      <label className={styles.label}>{props.label}</label>
      <div className={styles.selectBoxWrap}>
        <select
          className={styles.selectBox}
          value={props.value}
          onChange={(event) => props.onChange(event)}
        >
          {props.options.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectBox;
