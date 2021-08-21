import styles from 'src/assets/styles/modules/ProfileEditModal.module.scss';
import { ModalWrapper } from '.';
import { DialogContent, DialogActions } from '@material-ui/core/';
import { PrimayButton, ThirdaryButton } from '../buttons';
import { TextField } from '../forms';
import { useState, useCallback } from 'react';
import { auth } from 'src/firebase';
import { changeEmail } from 'src/api';
import { ChangeEmailParams } from 'src/types';
import { useEffect } from 'react';

interface Props {
  email: string;
  open: boolean;
  close: () => void;
}

const ProfileEditModal: React.VFC<Props> = (props) => {
  const [oldEmail, setOldEmail] = useState('');
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');
  const [password, setPassword] = useState('');

  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [email],
  );
  const inputEmail2 = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail2(event.target.value);
    },
    [email],
  );
  const inputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [password],
  );
  const changeMailAction = useCallback(() => {
    const user = auth.currentUser;
    if (!user || !oldEmail) return;
    const data: ChangeEmailParams = {
      oldEmail,
      email,
      password,
    };
    changeEmail(user, data).then(() => {
      setOldEmail('');
      setEmail('');
      setEmail2('');
      setPassword('');
      props.close();
    });
  }, [email, password]);
  useEffect(() => {
    if (props.open) {
      const user = auth.currentUser;
      setOldEmail(user?.email || '');
    }
  }, [props.open]);
  const isValidateInputs = email === '' || password === '' || email !== email2;
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
        <div className={styles.item}>
          <TextField
            label={'パスワード'}
            placeholder={'パスワードを入力'}
            type={'password'}
            value={password}
            onChange={inputPassword}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <ThirdaryButton text={'キャンセル'} onClick={props.close} />
        <PrimayButton
          disabled={isValidateInputs}
          text={'変更'}
          onClick={changeMailAction}
        />
      </DialogActions>
    </ModalWrapper>
  );
};

export default ProfileEditModal;
