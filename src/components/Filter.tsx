import { useCallback, useState } from 'react';
import styles from '../assets/styles/modules/Filter.module.scss';
import { SelectBox, TextField } from './forms';
import { Options } from 'src/types';
import Stars from './Stars';

interface Props {
  status: Options[];
  categories: Options[];
  priority: number;
  onClick: (priority: number) => void;
}

const Filter: React.VFC<Props> = (props) => {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('completed');

  const inputContent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setContent(event.currentTarget.value);
    },
    [content, setContent],
  );

  const inputStatus = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setStatus(event.currentTarget.value);
    },
    [status, setStatus],
  );

  const selectedCategory = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(event.currentTarget.value);
    },
    [category, setCategory],
  );
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={`${styles.filterItem} ${styles.filterImportant}`}>
          <label className={styles.label}>重要度</label>
          <div className={styles.filed}>
            <Stars priority={props.priority} onClick={props.onClick} />
          </div>
        </div>
        <div className={styles.filterItem}>
          <div className={styles.textField}>
            <TextField
              label={'内容'}
              placeholder={'内容を入力'}
              type={'text'}
              value={content}
              onChange={inputContent}
            />
          </div>
        </div>
        <div className={styles.filterItem}>
          <div className={styles.selectFiled}>
            <SelectBox
              label="ステータス"
              value={status}
              options={props.status}
              onChange={inputStatus}
            />
          </div>
        </div>
        <div className={styles.filterItem}>
          <div className={styles.selectFiled}>
            <SelectBox
              label="カテゴリ"
              value={category}
              options={props.categories}
              onChange={selectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
