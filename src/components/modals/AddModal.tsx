import React, { useState, useCallback } from 'react';
import styles from 'src/assets/styles/modules/AddModal.module.scss';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import { SelectBox, TextField, TextErea } from 'src/components/forms';

interface Props {
  title: string;
  open: boolean;
  close: () => void;
}

const AddModal: React.VFC<Props> = (props) => {
  const [body, setBody] = useState('');
  const [limit, setLimit] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const inputBody = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBody(event.currentTarget.value);
    },
    [setBody],
  );
  const selectLimit = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setLimit(event.currentTarget.value);
    },
    [setLimit],
  );
  const selectCategory = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(event.currentTarget.value);
    },
    [setCategory],
  );
  const inputNotes = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNotes(event.currentTarget.value);
    },
    [setBody],
  );
  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">リストに追加</DialogTitle>
      <DialogContent>
        <DialogContentText>
          バケットリストに追加したい内容を入力してください。
          <br />
          設定した内容はいつでも変更することが可能です。
        </DialogContentText>
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
            <SelectBox label={'期限'} value={limit} onChange={selectLimit} />
          </div>
          <span className={styles.item__old}>あなたの年齢：50歳</span>
        </div>
        <div className={`${styles.item} ${styles.itemHalf}`}>
          <div className={styles.item__half}>
            <SelectBox
              label={'カテゴリ'}
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
            value={notes}
            onChange={inputNotes}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.close}>
          キャンセル
        </Button>
        <Button color="primary">追加する</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
