import styles from 'src/assets/styles/modules/ProfileEditModal.module.scss';
import { ModalWrapper } from '.';
import { DialogContent, DialogActions } from '@material-ui/core/';
import { PrimayButton, ThirdaryButton } from '../buttons';
import { TextField } from '../forms';
import { useEffect, useState, useCallback } from 'react';

interface Props {
  open: boolean;
  close: () => void;
}

const ProfileEditModal: React.VFC<Props> = (props) => {
  const [email, setmail] = useState('');
  const [email2, setmail2] = useState('');

  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setmail(event.target.value);
    },
    [email],
  );
  const inputEmail2 = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setmail2(event.target.value);
    },
    [email],
  );
  useEffect(() => {
    // getGenders().then((genders) => setGenders(genders));
  }, []);
  return (
    <ModalWrapper open={props.open} title={'プロフィールを編集'}>
      <DialogContent>
        <div className={styles.item}>
          <TextField
            label={'新しいメールアドレス'}
            placeholder={'新しいメールアドレスを入力'}
            type={'text'}
            value={email}
            onChange={inputEmail}
          />
        </div>
        <div className={styles.item}>
          <TextField
            label={'もう一度入力してください'}
            placeholder={'もう一度入力'}
            type={'text'}
            value={email2}
            onChange={inputEmail2}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <ThirdaryButton text={'キャンセル'} onClick={props.close} />
        <PrimayButton text={'変更'} onClick={() => alert('変更')} />
      </DialogActions>
    </ModalWrapper>
  );
};

export default ProfileEditModal;
