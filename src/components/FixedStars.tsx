import styles from 'src/assets/styles/modules/FixedStars.module.scss';

interface Props {
  priority: number;
}

const Stars: React.VFC<Props> = (props) => {
  return (
    <div className={styles.starBox}>
      {[...Array(props.priority)].map((_, i) => (
        <span
          className={`${styles.star} ${
            i + 1 > props.priority && styles.nonActive
          }`}
          key={i}
        >
          <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/298/star_2b50.png" />
        </span>
      ))}
    </div>
  );
};

export default Stars;
