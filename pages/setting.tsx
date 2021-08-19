import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import styles from 'src/assets/styles/modules/Setting.module.scss';
import { Chip, Header } from 'src/components';
import { addCategory, getCategories, getUser } from 'src/api';
import { Options, User } from 'src/types';
import { auth } from 'src/firebase';
import { TitleHeader } from 'src/components/settings/';
import { Settings } from '@material-ui/icons';
import { TextField } from 'src/components/forms';
import { PrimayButton } from 'src/components/buttons';

const Setting = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Options[] | never[]>([]);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);

  const inputCategory = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewCategory(event.target.value);
    },
    [],
  );

  const addAction = useCallback(() => {
    if (!user) return;
    const data = {
      id: '',
      name: newCategory,
      order: categories.length + 1,
    };
    addCategory(user.uid, data).then(() => {
      getCategories(user.uid).then((value) => setCategories(value));
    });
  }, [newCategory, categories]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/account/signin');
    });
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    getUser(currentUser.uid).then((user) => setUser(user));
    getCategories(currentUser.uid).then((value) => setCategories(value));
  }, [currentUser]);

  const categoryContent = () => {
    return (
      <>
        <h4 className={styles.subTitle}>カテゴリの追加</h4>
        <p className={styles.exText}>
          最大10個まで登録できます。（10文字以内で入力してください）
        </p>
        <div className={styles.inpuErea}>
          <div className={styles.inpuEreaField}>
            <TextField
              label={''}
              placeholder={'追加するカテゴリを入力'}
              type={'text'}
              value={newCategory}
              onChange={inputCategory}
            />
            <div className={styles.inputCount}>0/10 文字</div>
          </div>
          <PrimayButton text={'追加'} onClick={addAction} />
        </div>
        <h4 className={styles.subTitle}>設定済みのカテゴリ</h4>
        {categories.map((category, i) => (
          <div className={styles.chipBox} key={i}>
            <Chip text={category.name} />
          </div>
        ))}
      </>
    );
  };
  return (
    <div className={styles.settingWrapper}>
      <h2 className={styles.pageTitle}>
        <span className={styles.pageTitleIcon}>
          <Settings />
        </span>
        <span className={styles.pageTitleText}>設定</span>
      </h2>
      <Header username={user?.username} />
      <TitleHeader>
        <div className={styles.contentWrap}>{categoryContent()}</div>
      </TitleHeader>
    </div>
  );
};

export default Setting;
