import styles from '../../assets/styles/modules/SelectBox.module.scss';

interface Props {
  id?: string;
  label: string;
  select: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const SelectBox = (props: Props) => {
  return (
    <>
      <label className={styles.label}>{props.label}</label>
      <div className={styles.selectBoxWrap}>
        <select
          className={styles.selectBox}
          value={props.value}
          onChange={(event) => props.select(event)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
    </>
  );
};

export default SelectBox;
