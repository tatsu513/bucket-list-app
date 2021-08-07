import { useCallback, useState, useEffect } from 'react';
import styles from 'src/assets/styles/modules/SignIn.module.scss';
import { TextField } from 'src/components/forms';
import { PrimayButton } from 'src/components/buttons';
import { TextLink } from 'src/components';
import { useRouter } from 'next/router';
import { auth } from 'src/firebase';

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const disabled = email === '' || password === '';

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
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push('/');
    });
  }, []);

  const signIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      auth.signInWithEmailAndPassword(email, password).then((result) => {
        const user = result.user;
        if (user) router.push('/');
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>サインイン</h2>
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
      <div className={`${styles.item} ${styles.button}`}>
        <PrimayButton
          text={'サインイン'}
          fullWidth={true}
          disabled={disabled}
          onClick={signIn}
        />
      </div>
      <div className={`${styles.item} ${styles.textLink}`}>
        <TextLink href={'/account/signup'} text={'新規登録'} />
      </div>
    </div>
  );
};

export default Signin;
