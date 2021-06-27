import styles from '../../assets/styles/modules/TextField.module.scss';
interface Props {
  label: string;
  placeholder: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = (props: Props) => {
  return (
    <>
      <label className={styles.label}>{props.label}</label>
      <input
        className={styles.textField}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(event) => props.onChange(event)}
      />
    </>
  );
};

export default TextField;
