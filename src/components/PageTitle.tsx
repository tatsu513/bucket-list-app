import { ReactNode } from 'react';
import styles from 'src/assets/styles/modules/PageTitle.module.scss';

interface Props {
  children: ReactNode;
  title: string;
}

const PageTitle: React.VFC<Props> = (props) => {
  return (
    <h2 className={styles.pageTitle}>
      <span className={styles.pageTitleIcon}>{props.children}</span>
      <span className={styles.pageTitleText}>{props.title}</span>
    </h2>
  );
};

export default PageTitle;
