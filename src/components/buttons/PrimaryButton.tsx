import styles from 'src/assets/styles/modules/PrimaryButton.module.scss';

interface Props {
  text: string;
}

const PrimaryButton: React.VFC<Props> = (props) => {
  return <button className={styles.primaryButton}>{props.text}</button>;
};

export default PrimaryButton;
