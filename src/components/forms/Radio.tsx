import styles from 'src/assets/styles/modules/Radio.module.scss';

interface Props {
  id: string;
  label: string;
  selectedValue: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.VFC<Props> = (props) => {
  return (
    <>
      <input
        className={styles.radio}
        id={props.id}
        type="radio"
        value={props.id}
        name={props.name}
        checked={props.id === props.selectedValue}
        onChange={(event) => props.onChange(event)}
      />
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
    </>
  );
};

export default Radio;
