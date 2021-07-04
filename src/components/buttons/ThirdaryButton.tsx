import styles from 'src/assets/styles/modules/ThirdaryButton.module.scss';

interface Props {
  text: string;
  onClick: () => void;
}

const ThirdaryButton: React.VFC<Props> = (props) => {
  return (
    <button className={styles.ThirdaryButton} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default ThirdaryButton;
