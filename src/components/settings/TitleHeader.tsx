import { ReactNode, useState } from 'react';
import styles from 'src/assets/styles/modules/TItleHeader.module.scss';
import { AddCircleOutline } from '@material-ui/icons';
import { RemoveCircleOutline } from '@material-ui/icons';

interface Props {
  children: ReactNode;
}

const TitleHeader: React.VFC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.title} onClick={() => setIsOpen(!isOpen)}>
        <h3 className={styles.titleText}>カテゴリ</h3>
        <span className={styles.titleIcon}>
          {isOpen ? (
            <RemoveCircleOutline fontSize={'inherit'} />
          ) : (
            <AddCircleOutline fontSize={'inherit'} />
          )}
        </span>
      </div>
      <div className={`${styles.contents} ${isOpen && styles.isOpen}`}>
        {props.children}
      </div>
    </>
  );
};

export default TitleHeader;
