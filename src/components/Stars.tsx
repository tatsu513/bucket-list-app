import { useState } from 'react';
import styles from 'src/assets/styles/modules/Stars.module.scss';

const Stars: React.VFC = () => {
  const [activIndex, setActiveIndex] = useState(3);
  const selectStar = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <span
          className={`${styles.star} ${i + 1 > activIndex && styles.nonActive}`}
          key={i}
          onClick={() => selectStar(i + 1)}
        >
          <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/298/star_2b50.png" />
        </span>
      ))}
    </>
  );
};

export default Stars;
