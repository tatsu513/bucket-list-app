import { useCallback, useState } from 'react';
import styles from 'src/assets/styles/modules/Signup.module.scss';
import { TextField } from 'src/components/forms';
import { PrimayButton } from 'src/components/buttons';
import { TextLink } from 'src/components/index';

const Signup: React.VFC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.currentTarget.value);
    },
    [],
  );
  const inputPassWord = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.currentTarget.value);
    },
    [],
  );
  const inputUsername = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.currentTarget.value);
    },
    [],
  );
  const inputBirthday = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBirthday(event.currentTarget.value);
    },
    [],
  );
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>新規登録</h2>
      <div className={styles.item}>
        <TextField
          label={'メールアドレス'}
          placeholder={'メールアドレスを入力'}
          type={'text'}
          value={email}
          onChange={inputEmail}
        />
      </div>
      <div className={styles.item}>
        <TextField
          label={'パスワード'}
          placeholder={'パスワードを入力'}
          type={'password'}
          value={password}
          onChange={inputPassWord}
        />
      </div>
      <div className={styles.item}>
        <TextField
          label={'ユーザーネーム'}
          placeholder={'ユーザーネームを入力'}
          type={'text'}
          value={username}
          onChange={inputUsername}
        />
      </div>
      <div className={styles.item}>
        <TextField
          label={'誕生日'}
          placeholder={'誕生日を入力'}
          type={'text'}
          value={birthday}
          onChange={inputBirthday}
        />
      </div>
      <div className={`${styles.item} ${styles.button}`}>
        <PrimayButton text={'サインイン'} fullWidth={true} />
      </div>
      <div className={`${styles.item} ${styles.textLink}`}>
        <TextLink href={'/account/signup'} text={'サインイン'} />
      </div>
    </div>
  );
};

export default Signup;
