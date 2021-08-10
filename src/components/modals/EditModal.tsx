import React, { useEffect, useState, useCallback } from 'react';
import styles from 'src/assets/styles/modules/AddModal.module.scss';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import { CheckBox, SelectBox, TextField, TextErea } from 'src/components/forms';
import { PrimayButton, ThirdaryButton } from 'src/components/buttons';
import { Item, Options, User } from 'src/types';
import { Stars } from 'src/components';
import { getDateFrom8Digit, convertTo8Digit } from 'src/util/convertDate';
import { getFeatureAge } from 'src/util/convertAge';
import { convertDate } from 'src/plugins/dayjs';
interface Props {
  categories: Options[];
  item: Item;
  user: User;
  open: boolean;
  close: () => void;
}

const EditModal: React.VFC<Props> = (props) => {
  const [priority, setPriority] = useState(props.item.priority);
  const [title, setTitle] = useState(props.item.title);
  const [limitDate, setLimitDate] = useState('');
  const [dateLimitDate, setDateLimitDate] = useState<Date | null>(null);
  const [displayAge, setDisplayAge] = useState<number | null>(
    props.item.limitAge,
  );
  const [afterSetFlag, setAfterSetFlag] = useState(false);
  const [category, setCategory] = useState(props.item.category);
  const [memo, setMemo] = useState(props.item.memo);

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
        if (newDate) setDisplayAge(getFeatureAge(newDate, props.user.age));
      } else {
        setDateLimitDate(null);
        setDisplayAge(null);
      }
    },
    [props.user.age, limitDate],
  );
  const handleAfterSetFlag = useCallback(() => {
    setAfterSetFlag((prevState) => !prevState);
  }, []);
  const isInvalidInputs = useCallback(() => {
    const inInvalidLimitDate = afterSetFlag ? false : !displayAge;
    console.log(inInvalidLimitDate);
    return !priority || !title || !category || inInvalidLimitDate;
  }, [priority, title, category, afterSetFlag, displayAge]);

  useEffect(() => {
    console.log(props.item.category);
    if (props.item.limitDate) {
      const convertDateType = new Date(convertDate(props.item.limitDate));
      setLimitDate(convertTo8Digit(convertDateType));
    }
    setDisplayAge(props.item.limitAge);
  }, [props.user.age]);
  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">リストに追加</DialogTitle>
      <DialogContent>
        <DialogContentText>
          項目の編集を行います。変更後登録ボタンを押下して完了してください。
        </DialogContentText>
        <div className={`${styles.item} ${styles.itemStar}`}>
          <div
            className={styles.itemStar__label}
            onClick={() => alert('おおお')}
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
          text={'登録'}
          disabled={isInvalidInputs()}
          onClick={() => alert('登録')}
        />
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
