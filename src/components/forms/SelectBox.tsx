import { Options } from 'src/types';
import styles from '../../assets/styles/modules/SelectBox.module.scss';
interface Props {
  id?: string;
  itemName: string;
  isShowAll?: boolean;
  label: string;
  options: Options[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox: React.VFC<Props> = (props) => {
  const idName = `${props.itemName}Id`;
  return (
    <>
      <label className={styles.label}>{props.label}</label>
      <div className={styles.selectBoxWrap}>
        <select
          className={styles.selectBox}
          value={props.value || 'default'}
          onChange={(event) => props.onChange(event)}
        >
          <option value="default" disabled>
            カテゴリを選択
          </option>
          {props.isShowAll && <option value="all">すべて</option>}
          {props.options.map((option) => (
            <option key={option[idName]} value={option[idName]}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectBox;
