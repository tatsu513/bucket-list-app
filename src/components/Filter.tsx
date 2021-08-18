import styles from '../assets/styles/modules/Filter.module.scss';
import { CheckBox, SelectBox, TextField } from './forms';
import { Options } from 'src/types';
import { AddCircleOutline } from '@material-ui/icons';
import { RemoveCircleOutline } from '@material-ui/icons';
import Stars from './Stars';
import { useState } from 'react';

interface Props {
  categories: Options[];
  isAllpriority: boolean;
  priority: number;
  selectedCategory: string;
  selectedStatus: string;
  status: Options[];
  title: string;
  onInputTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSelectStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick: (priority: number) => void;
  onClickIsAllPriority: () => void;
}

const Filter: React.VFC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div
        className={`${styles.controller} ${!isOpen && styles.isClose}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.controllerButton}>
          絞り込み
          <span className={styles.controllerIcon}>
            {isOpen ? (
              <RemoveCircleOutline fontSize={'inherit'} />
            ) : (
              <AddCircleOutline fontSize={'inherit'} />
            )}
          </span>
        </span>
      </div>
      <div className={`${styles.contentBox} ${!isOpen && styles.isClose}`}>
        <div className={styles.content}>
          <div className={`${styles.filterItem} ${styles.filterImportant}`}>
            <label className={styles.label}>重要度</label>
            <div className={styles.starsFiled}>
              <div className={props.isAllpriority ? styles.starsWrap : ''}>
                <Stars priority={props.priority} onClick={props.onClick} />
              </div>
              <div className={styles.priorityCheck}>
                <CheckBox
                  checked={props.isAllpriority}
                  id={'all-priority'}
                  label={'すべての重要度'}
                  onChange={props.onClickIsAllPriority}
                />
              </div>
            </div>
          </div>
          <div className={styles.filterItem}>
            <label className={styles.label}>タイトル</label>
            <TextField
              label={''}
              placeholder={'内容を入力'}
              type={'text'}
              value={props.title}
              onChange={props.onInputTitle}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.filterItem}>
            <label className={styles.label}>ステータス</label>
            <SelectBox
              itemName={'status'}
              isShowAll={true}
              label=""
              value={props.selectedStatus}
              options={props.status}
              onChange={props.onSelectStatus}
            />
          </div>
          <div className={styles.filterItem}>
            <label className={styles.label}>カテゴリ</label>
            <SelectBox
              itemName={'category'}
              isShowAll={true}
              label=""
              value={props.selectedCategory}
              options={props.categories}
              onChange={props.onSelectCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
