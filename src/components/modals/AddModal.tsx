import React, { useState, useCallback } from 'react';
import styles from 'src/assets/styles/modules/AddModal.module.scss';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import { SelectBox, TextField, TextErea } from 'src/components/forms';
import { PrimayButton, ThirdaryButton } from 'src/components/buttons';
import { Options } from 'src/types';
import { Stars } from 'src/components';
import { getToday, getDateFrom8Digit } from 'src/util/convertDate';
import { getFeatureAge } from 'src/util/convertAge';
import { getUniqueId, getIdByName } from 'src/util/common';
import { db, FirebaseTimestamp } from 'src/firebase';
interface Props {
  age: number;
  uid: string;
  title: string;
  open: boolean;
  categories: Options[];
  status: Options[];
  close: () => void;
}

const AddModal: React.VFC<Props> = (props) => {
  const [priority, setPriority] = useState(1);
  const [body, setBody] = useState('');
  const [limitDate, setLimitDate] = useState(getToday());
  const [dateLimitDate, setDateLimitDate] = useState<Date | null>(null);
  const [displayAge, setDisplayAge] = useState<number>(props.age);
  const [category, setCategory] = useState('');
  const [memo, setMemo] = useState('');

  const selectedPriority = useCallback(
    (selectedPriority: number) => {
      const oldValue = priority;
      if (selectedPriority - oldValue <= 0) {
        if (selectedPriority !== 1) {
          setPriority(selectedPriority - 1);
        }
      } else {
        setPriority(selectedPriority);
      }
    },
    [setPriority, priority],
  );

  const inputBody = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBody(event.currentTarget.value);
    },
    [setBody],
  );
  const selectCategory = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(event.currentTarget.value);
    },
    [setCategory],
  );
  const inputMemo = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMemo(event.currentTarget.value);
    },
    [setBody],
  );
  const inputLimitDate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      if (value.match(/\d{8}/)) {
        const newDate = getDateFrom8Digit(value);
        setDateLimitDate(newDate);
        if (newDate) setDisplayAge(getFeatureAge(newDate, props.age));
      }
      setLimitDate(event.currentTarget.value);
    },
    [],
  );
  const addItem = () => {
    const initialData = {
      completedAt: null,
      createdAt: FirebaseTimestamp.now(),
      itemId: getUniqueId(),
      limitAge: displayAge,
      limitDate: dateLimitDate,
      memo: memo,
      order: 2,
      priority: priority,
      status: 'bbb',
      title: body,
      updatedAt: FirebaseTimestamp.now(),
    };
    db.collection('users')
      .doc(props.uid)
      .collection('items')
      .doc()
      .set(initialData)
      .then(() => {
        props.close();
      });
    console.log(initialData);
  };
  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">リストに追加</DialogTitle>
      <DialogContent>
        <DialogContentText>
          バケットリストに追加したい内容を入力してください。
          設定した内容はいつでも変更することが可能です。
        </DialogContentText>
        <div className={`${styles.item} ${styles.itemStar}`}>
          <div
            className={styles.itemStar__label}
            onClick={() => getIdByName(props.status, '未完了')}
          >
            重要度：
          </div>
          <Stars priority={priority} onClick={selectedPriority} />
        </div>
        <div className={styles.item}>
          <TextField
            label={'内容'}
            placeholder={'内容を入力'}
            type={'text'}
            value={body}
            onChange={inputBody}
          />
        </div>
        <div className={`${styles.item} ${styles.itemFlex}`}>
          <div className={styles.item__half}>
            <TextField
              label={'期限日（例：2030年10月1日 → 20301001）'}
              placeholder={'期限日を入力'}
              type={'number'}
              value={limitDate}
              onChange={inputLimitDate}
            />
          </div>
          <span className={styles.item__old}>あなたの年齢：{displayAge}歳</span>
        </div>
        <div className={`${styles.item} ${styles.itemHalf}`}>
          <div className={styles.item__half}>
            <SelectBox
              label={'カテゴリ'}
              value={category}
              options={props.categories}
              onChange={selectCategory}
            />
          </div>
        </div>
        <div className={styles.item}>
          <TextErea
            label={'備考'}
            placeholder={'備考を入力'}
            rows={5}
            value={memo}
            onChange={inputMemo}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <ThirdaryButton text={'キャンセル'} onClick={props.close} />
        <PrimayButton text={'追加'} onClick={addItem} />
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
