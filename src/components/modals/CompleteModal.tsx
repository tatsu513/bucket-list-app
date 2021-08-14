import { useCallback, useState } from 'react';
import styles from 'src/assets/styles/modules/CompleteModal.module.scss';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core/';
import { PrimayButton, ThirdaryButton } from 'src/components/buttons';
import { TextField } from 'src/components/forms';
import { getDateFrom8Digit, convertTo8Digit } from 'src/util/convertDate';
import { getFeatureAge } from 'src/util/convertAge';
import { Item, User } from 'src/types';

interface Props {
  item: Item;
  user: User;
  open: boolean;
  close: () => void;
}

const CompleteModal: React.VFC<Props> = (props) => {
  const [limitDate, setLimitDate] = useState('');
  const [dateLimitDate, setDateLimitDate] = useState<Date | null>(null);
  const [displayAge, setDisplayAge] = useState<number | null>(
    props.item.limitAge,
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
  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">リストに追加</DialogTitle>
      <DialogContent>
        <div className={styles.leadText}>
          <DialogContentText>
            『{props.item.title}』を完了します。
          </DialogContentText>
        </div>
        <div className={`${styles.item} ${styles.itemFlex}`}>
          <div className={styles.item__half}>
            <TextField
              label={'達成日（例：2030年10月1日 → 20301001）'}
              placeholder={'達成日を入力'}
              type={'number'}
              value={limitDate}
              onChange={inputLimitDate}
            />
          </div>
          <span className={styles.item__old}>あなたの年齢：{displayAge}歳</span>
        </div>
        <div className={styles.item}>
          <div className={styles.itemTitle}>達成記念写真</div>
        </div>
      </DialogContent>
      <DialogActions>
        <ThirdaryButton text={'キャンセル'} onClick={props.close} />
        <PrimayButton
          text={'アイテムを完了'}
          disabled={false}
          onClick={() => alert('アイテムを完了')}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CompleteModal;
