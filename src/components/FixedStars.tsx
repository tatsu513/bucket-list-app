import styles from 'src/assets/styles/modules/FixedStars.module.scss';

interface Props {
  priority: number;
  size?: number;
}

const Stars: React.VFC<Props> = (props) => {
  const starWidth = { width: props.size ? `${props.size}px` : '24px' };
  const starBoxHeight = { height: props.size ? `${props.size}px` : '24px' };
  return (
    <div className={styles.starBox} style={starBoxHeight}>
      {[...Array(props.priority)].map((_, i) => (
        <span
          className={`${styles.star} ${
            i + 1 > props.priority && styles.nonActive
          }`}
          key={i}
          style={starWidth}
        >
          <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/298/star_2b50.png" />
        </span>
      ))}
    </div>
  );
};

export default Stars;
