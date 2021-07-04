import styles from 'src/assets/styles/modules/thirdaryButton.module.scss';

interface Props {
  text: string;
  onClick: () => void;
}

const ThirdaryButton: React.VFC<Props> = (props) => {
  return (
    <button className={styles.thirdaryButton} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default ThirdaryButton;
