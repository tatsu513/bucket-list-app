import React from 'react';
import styles from '../assets/styles/modules/List.module.scss';
import { Item, Options } from 'src/types';
import { itemsHeader } from 'src/constants';
import { convertDate, getYear } from 'src/plugins/dayjs';
import { getNameById } from 'src/util/common';
import { useRouter } from 'next/router';

interface Props {
  categories: Options[];
  items: Item[];
  status: Options[];
}

const List: React.VFC<Props> = (props) => {
  const router = useRouter();
  const handleRowClick = (id: string) => {
    alert(id);
    router.push(`/item/${id}`);
  };
  return (
    <table className={styles.table}>
      <colgroup>
        <col className="body" />
        <col className={styles.limit} />
        <col className={styles.status} />
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
        {props.items.length > 0 &&
          props.items.map((item) => (
            <tr
              className={styles.tableRow}
              key={item.itemId}
              onClick={() => handleRowClick(item.itemId)}
            >
              <td className={`${styles.cell} ${styles.cellBody}`}>
                <div className={styles.cellBodyTitle}>{item.title}</div>
                <span className={styles.cellBodyText}>
                  設定日：{convertDate(item.createdAt)}
                </span>
                <span className={styles.cellBodyText}>
                  達成日：
                  {convertDate(item.completedAt)}
                </span>
              </td>
              <td className={`${styles.cell} ${styles.cellLimit}`}>
                <div className={styles.cellLimitOld}>
                  {item.limitAge || '-'}歳
                </div>
                <div className={styles.cellLimitYear}>
                  {item.limitDate ? `(${getYear(item.limitDate)})` : '-'}
                </div>
              </td>
              <td className={`${styles.cell} ${styles.cellCheck}`}>
                {getNameById(props.status, item.status, 'status')}
                {/* {(() => {
                  if (item.status === '完了') {
                    return (
                      <div className={styles.cellStatusIconBox}>
                        <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/298/party-popper_1f389.png" />
                      </div>
                    );
                  } else {
                    return null;
                  }
                })()} */}
              </td>
              <td className={`${styles.cell} ${styles.cellCategory}`}>
                {getNameById(props.categories, item.category, 'category')}
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
        {props.items.length === 0 && (
          <tr className={`${styles.tableRow} ${styles.tableBlank}`}>
            <td className={styles.cell} colSpan={5}>
              リストが登録されていません
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default List;
