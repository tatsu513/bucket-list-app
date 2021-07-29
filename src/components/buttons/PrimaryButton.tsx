import styles from 'src/assets/styles/modules/PrimaryButton.module.scss';

interface Props {
  text: string;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButton: React.VFC<Props> = (props) => {
  return (
    <button
      className={`${styles.primaryButton} ${props.fullWidth && styles.full}`}
      disabled={props.disabled || false}
      onClick={(event) => props.onClick(event)}
    >
      {props.text}
    </button>
  );
};

export default PrimaryButton;
