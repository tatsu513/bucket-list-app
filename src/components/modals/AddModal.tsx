import React, { useEffect, useState, useCallback } from 'react';
import styles from 'src/assets/styles/modules/AddModal.module.scss';
import {
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core/';
import { ModalWrapper } from './';
import { CheckBox, SelectBox, TextField, TextErea } from 'src/components/forms';
import { PrimayButton, ThirdaryButton } from 'src/components/buttons';
import { Item, Options } from 'src/types';
import { Stars } from 'src/components';
import {
  getToday,
  getDateFrom8Digit,
  getDateAtCalc,
} from 'src/util/convertDate';
import { getFeatureAge } from 'src/util/convertAge';
import { getUniqueId, getIdByName } from 'src/util/common';
import { FirebaseTimestamp } from 'src/firebase';
import { createItem } from 'src/api';
interface Props {
  age: number;
  categories: Options[];
  itemLength: number;
  uid: string;
  title: string;
  open: boolean;
  status: Options[];
  close: () => void;
  toggleCreatedStatus: (flag: boolean) => void;
}

const AddModal: React.VFC<Props> = (props) => {
  const [priority, setPriority] = useState(1);
  const [title, setTitle] = useState('');
  const [limitDate, setLimitDate] = useState(getDateAtCalc(getToday(), 1));
  const [dateLimitDate, setDateLimitDate] = useState<Date | null>(null);
  const [displayAge, setDisplayAge] = useState<number | null>(null);
  const [afterSetFlag, setAfterSetFlag] = useState(false);
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

  const inputTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value);
    },
    [setTitle],
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
    [setMemo],
  );
  const inputLimitDate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setLimitDate(value);
      if (value.match(/\d.*/g) && value.length === 8) {
        const newDate = getDateFrom8Digit(value);
        setDateLimitDate(newDate);
        if (newDate) setDisplayAge(getFeatureAge(newDate, props.age));
        console.log(newDate, props.age);
      } else {
        setDateLimitDate(null);
        setDisplayAge(null);
      }
    },
    [props.age, limitDate],
  );
  const handleAfterSetFlag = useCallback(() => {
    setAfterSetFlag((prevState) => !prevState);
  }, []);
  const addItem = () => {
    const initialData: Item = {
      category: category,
      completedAt: null,
      createdAt: FirebaseTimestamp.now(),
      itemId: getUniqueId(),
      limitAge: afterSetFlag ? null : displayAge,
      limitDate: afterSetFlag ? null : dateLimitDate,
      memo: memo,
      order: props.itemLength + 1,
      priority: priority,
      status: String(getIdByName(props.status, '未完了', 'status')),
      title: title,
      updatedAt: FirebaseTimestamp.now(),
    };
    createItem(props.uid, initialData).then(() => {
      props.toggleCreatedStatus(true);
      props.close();
    });
  };
  const isInvalidInputs = useCallback(() => {
    const inInvalidLimitDate = afterSetFlag ? false : !displayAge;
    return !priority || !title || !category || inInvalidLimitDate;
  }, [priority, title, category, afterSetFlag, displayAge]);

  useEffect(() => {
    setDisplayAge(props.age + 1);
  }, [props.age]);
  return (
    <ModalWrapper open={props.open} title={'リストに追加'}>
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
            value={title}
            onChange={inputTitle}
          />
        </div>
        <div className={`${styles.item} ${styles.itemFlex}`}>
          <div className={styles.item__half}>
            <TextField
              disabled={afterSetFlag}
              label={'期限日（例：2030年10月1日 → 20301001）'}
              placeholder={'期限日を入力'}
              type={'number'}
              value={limitDate}
              onChange={inputLimitDate}
            />
          </div>
          <span className={styles.item__old}>あなたの年齢：{displayAge}歳</span>
          <div className={styles.limitDateCheck}>
            <CheckBox
              checked={afterSetFlag}
              id={'aaa'}
              label={'あとで登録する'}
              onChange={handleAfterSetFlag}
            />
          </div>
        </div>
        <div className={`${styles.item} ${styles.itemHalf}`}>
          <div className={styles.item__half}>
            <SelectBox
              itemName={'category'}
              label={'カテゴリ'}
              options={props.categories}
              value={category}
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
        <PrimayButton
          text={'追加'}
          disabled={isInvalidInputs()}
          onClick={addItem}
        />
      </DialogActions>
    </ModalWrapper>
  );
};

export default AddModal;
