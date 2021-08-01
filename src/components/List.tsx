import React from 'react';
import styles from '../assets/styles/modules/List.module.scss';
import { StarRounded, AssignmentTurnedIn } from '@material-ui/icons';
import { Item } from 'src/types';
import { itemsHeader } from 'src/constants';
import { convertDate, getYear } from 'src/plugins/dayjs';

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
          {itemsHeader.map((header) => (
            <th
              className={styles.cellHead}
              style={{ textAlign: header.alignment }}
              key={header.id}
            >
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.items.map((item) => (
          <tr className={styles.tableRow} key={item.itemId}>
            <td className={`${styles.cell} ${styles.cellCheck}`}>
              {(() => {
                if (item.status === '完了') {
                  return (
                    <div className={styles.cellStatusIconBox}>
                      <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/298/party-popper_1f389.png" />
                    </div>
                  );
                } else {
                  return null;
                }
              })()}
            </td>
            <td className={`${styles.cell} ${styles.cellBody}`}>
              <div className={styles.cellBodyTitle}>{item.title}</div>
              <span className={styles.cellBodyText}>
                設定日：{convertDate(item.createdAt)}
              </span>
              <span className={styles.cellBodyText}>
                達成日：{convertDate(item.completedAt)}
              </span>
            </td>
            <td className={`${styles.cell} ${styles.cellLimit}`}>
              <div className={styles.cellLimitOld}>{item.age}歳</div>
              <div className={styles.cellLimitYear}>{`(${getYear(
                item.limitDate,
              )})`}</div>
            </td>
            <td className={`${styles.cell} ${styles.cellCategory}`}>
              {item.category}
            </td>
            <td className={`${styles.cell} ${styles.cellStar}`}>
              <div className={styles.cellStarIconBox}>
                {[...Array(item.priority)].map((_, i) => (
                  <span className={styles.cellStarIcon} key={i}>
                    <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/298/star_2b50.png" />
                  </span>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
