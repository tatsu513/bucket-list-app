import styles from 'src/assets/styles/modules/PrimaryButton.module.scss';

interface Props {
  text: string;
  fullWidth?: boolean;
}

const PrimaryButton: React.VFC<Props> = (props) => {
  return (
    <button
      className={`${styles.primaryButton} ${props.fullWidth && styles.full}`}
    >
      {props.text}
    </button>
  );
};

export default PrimaryButton;
