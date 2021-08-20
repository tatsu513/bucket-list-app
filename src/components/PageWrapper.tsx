import { ReactNode } from 'react';
import styles from 'src/assets/styles/modules/PageWrapper.module.scss';

interface Props {
  children: ReactNode;
}

const PageWrapper: React.VFC<Props> = (props) => {
  return <div className={styles.pageWrapper}>{props.children}</div>;
};

export default PageWrapper;
