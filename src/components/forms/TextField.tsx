import styles from '../../assets/styles/modules/TextField.module.scss';
interface Props {
  disabled?: boolean;
  isError?: boolean;
  label: string;
  placeholder: string;
  type: string;
  value: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.VFC<Props> = (props) => {
  return (
    <>
      <label className={styles.label}>{props.label}</label>
      <input
        className={`${styles.textField} ${props.isError && styles.isError}`}
        disabled={props.disabled}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value || ''}
        onChange={(event) => props.onChange(event)}
      />
    </>
  );
};

export default TextField;
