import styles from 'src/assets/styles/modules/TextErea.module.scss';

interface Props {
  label: string;
  placeholder: string;
  rows: number;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextErea: React.VFC<Props> = (props) => {
  return (
    <>
      <label className={styles.label}>{props.label}</label>
      <textarea
        className={styles.textErea}
        rows={props.rows}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.onChange(event)}
      />
    </>
  );
};

export default TextErea;
