import { useCallback, useState, useEffect } from 'react';
import styles from 'src/assets/styles/modules/Signup.module.scss';
import { TextField, Radio } from 'src/components/forms';
import { PrimayButton } from 'src/components/buttons';
import { TextLink } from 'src/components/index';
import { auth, db, FirebaseTimestamp } from 'src/firebase';
import { useRouter } from 'next/router';
import { Gender, InitialDataForCreateUser } from 'src/types';
import { getAge } from 'src/util/convertAge';
import { getGenders } from 'src/api';

const Signup: React.VFC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [dateBirthDay, setDateBirthday] = useState<Date | null>(null);
  const [gender, setGender] = useState('');
  const [genders, setGenders] = useState<Gender[] | never[]>([]);
  const [selectedGender, setSelectedGender] = useState('');

  const isInvalidDate = (date: Date) => {
    return Number.isNaN(date.getDate());
  };

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
      const value = event.currentTarget.value;
      if (value.match(/\d{8}/)) {
        const split = value.match(/^(\d{4})?[/-]?(\d{2})[/-]?(\d{2})$/);
        if (split) {
          const date = new Date(`${split[1]}-${split[2]}-${split[3]}`);
          setDateBirthday(isInvalidDate(date) ? null : date);
        }
      } else {
        setDateBirthday(null);
      }
      setBirthday(event.currentTarget.value);
    },
    [],
  );

  const selectGender = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedGender(event.currentTarget.value);
      setGender(event.currentTarget.value);
    },
    [],
  );

  const isValidateInputs = () => {
    const isInvalidEmail = email === '' || !/@/.test(email);
    const isInvalidBirthday = !dateBirthDay;
    return (
      isInvalidEmail ||
      password === '' ||
      username === '' ||
      isInvalidBirthday ||
      gender === ''
    );
  };

  const signUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      auth.createUserWithEmailAndPassword(email, password).then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();
          const age = getAge(dateBirthDay);

          if (!age) return false;

          const initialData: InitialDataForCreateUser = {
            age: age,
            birthday: dateBirthDay,
            createdAt: timestamp,
            email: email,
            gender: gender,
            role: 'customer',
            uid: uid,
            updatedAt: timestamp,
            username: username,
          };
          db.collection('users')
            .doc(uid)
            .set(initialData)
            .then(() => {
              router.push('/');
            });
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push('/');
    });
  }, []);

  useEffect(() => {
    getGenders().then((genders) => setGenders(genders));
  }, []);
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
          label={'誕生日（例：2000年10月1日 → 20001001）'}
          placeholder={'誕生日を入力'}
          type={'number'}
          value={birthday}
          onChange={inputBirthday}
        />
      </div>
      <div className={styles.item}>
        {genders.map((gender) => {
          return (
            <span key={gender.genderId} className={styles.radioItem}>
              <Radio
                id={gender.genderId}
                selectedValue={selectedGender}
                label={gender.genderType}
                name={'gender'}
                onChange={selectGender}
              />
            </span>
          );
        })}
      </div>
      <div className={`${styles.item} ${styles.button}`}>
        <PrimayButton
          text={'登録'}
          fullWidth={true}
          disabled={isValidateInputs()}
          onClick={signUp}
        />
      </div>
      <div className={`${styles.item} ${styles.textLink}`}>
        <TextLink href={'/account/signin'} text={'サインイン'} />
      </div>
    </div>
  );
};

export default Signup;
