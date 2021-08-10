import styles from 'src/assets/styles/modules/SecondaryButton.module.scss';

interface Props {
  text: string;
  onClick: () => void;
}

const SecondaryButton: React.VFC<Props> = (props) => {
  return (
    <button className={styles.SecondaryButton} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default SecondaryButton;
