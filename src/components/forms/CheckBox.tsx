import styles from 'src/assets/styles/modules/CheckBox.module.scss';

interface Props {
  checked: boolean;
  id: string;
  label: string;
  onChange: () => void;
}
const CheckBox: React.VFC<Props> = (props) => {
  return (
    <>
      <input
        className={styles.checkbox}
        checked={props.checked}
        type="checkbox"
        id={props.id}
        onChange={() => props.onChange()}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </>
  );
};

export default CheckBox;
