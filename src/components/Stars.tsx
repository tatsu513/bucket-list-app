import styles from 'src/assets/styles/modules/Stars.module.scss';

interface Props {
  priority: number;
  onClick: (priority: number) => void;
}

const Stars: React.VFC<Props> = (props) => {
  return (
    <div className={styles.starBox}>
      {[...Array(3)].map((_, i) => (
        <span
          className={`${styles.star} ${
            i + 1 > props.priority && styles.nonActive
          }`}
          key={i}
          onClick={() => props.onClick(i + 1)}
        >
          <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/298/star_2b50.png" />
        </span>
      ))}
    </div>
  );
};

export default Stars;
