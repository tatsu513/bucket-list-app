import React from 'react';
import styles from '../assets/styles/modules/List.module.scss';
import { StarRounded, AssignmentTurnedIn } from '@material-ui/icons';
import { Item } from 'src/types';

interface Props {
  items: Item[];
}

const List: React.VFC<Props> = (props) => {
  return (
    <table className={styles.table}>
      <colgroup>
        <col className={styles.status} />
        <col className="body" />
        <col className={styles.limit} />
        <col className={styles.category} />
        <col className={styles.star} />
      </colgroup>
      <thead>
        <tr>
          <th className={styles.cellHead}>ステータス</th>
          <th className={`${styles.cellHead} ${styles.cellHeadBody}`}>内容</th>
          <th className={styles.cellHead}>期限</th>
          <th className={styles.cellHead}>カテゴリ</th>
          <th className={styles.cellHead}>重要度</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.tableRow}>
          <td className={`${styles.cell} ${styles.cellCheck}`}>
            <AssignmentTurnedIn style={{ fontSize: 24 }} />
          </td>
          <td className={`${styles.cell} ${styles.cellBody}`}>
            <div className={styles.cellBodyTitle}>50歳で仕事を辞める</div>
            <span className={styles.cellBodyText}>設定日：2021/6/10</span>
            <span className={styles.cellBodyText}>達成日：2021/8/10</span>
          </td>
          <td className={`${styles.cell} ${styles.cellLimit}`}>
            <div className={styles.cellLimitOld}>50歳</div>
            <div className={styles.cellLimitYear}>（2040）</div>
          </td>
          <td className={`${styles.cell} ${styles.cellCategory}`}>
            １２３４５６７８９０
          </td>
          <td className={`${styles.cell} ${styles.cellStar}`}>
            <div className={styles.cellStarIconBox}>
              {[...Array(3)].map((_, i) => (
                <span className={styles.cellStarIcon} key={i}>
                  <StarRounded style={{ fontSize: 24 }} />
                </span>
              ))}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default List;
