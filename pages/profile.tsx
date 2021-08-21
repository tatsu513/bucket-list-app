import styles from 'src/assets/styles/modules/Profile.module.scss';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { Header, PageTitle, PageWrapper } from 'src/components';
import { Person, Face } from '@material-ui/icons';
import { SecondaryButton } from 'src/components/buttons';
import { useState } from 'react';
import { MailEditModal, ProfileEditModal } from 'src/components/modals';
import { useCallback, useEffect } from 'react';
import { auth } from 'src/firebase';
import { getGenders, getUser } from 'src/api';
import { Options, User } from 'src/types';
import { getNameById } from 'src/util/common';
import { convertToDisplayDate } from 'src/util/convertDate';

const Profile: React.VFC = () => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [genders, setGenders] = useState<Options[] | null>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenChangeMailModal, setIsOpenChangeMailModal] = useState(false);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);
  const openChangeMailModal = useCallback(() => {
    setIsOpenChangeMailModal(true);
  }, []);
  const closeChangeMailModal = useCallback(() => {
    setIsOpenChangeMailModal(false);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/account/signin');
    });
    getGenders().then((genders) => setGenders(genders));
  }, []);
  useEffect(() => {
    if (!currentUser) return;
    getUser(currentUser.uid).then((user) => setUser(user));
  }, [currentUser]);
  return (
    <PageWrapper>
      <Header />
      <PageTitle title={'プロフィール'}>
        <Person fontSize={'inherit'} />
      </PageTitle>
      <div className={styles.profileBox}>
        <div className={styles.profileImageBox}>
          <span className={styles.profileImage}>
            <Face fontSize={'inherit'} />
          </span>
        </div>
        {user && (
          <div className={styles.profileContent}>
            <dl>
              <dt className={styles.title}>ユーザーネーム</dt>
              <dd className={styles.body}>{user.username}</dd>
              <dt className={styles.title}>生年月日</dt>
              <dd className={styles.body}>
                {convertToDisplayDate(new Date(user.birthday.toDate()))}
              </dd>
              <dt className={styles.title}>性別</dt>
              <dd className={styles.body}>
                {getNameById(genders, user.gender, 'gender')}
              </dd>
            </dl>
            <div className={styles.controller}>
              <SecondaryButton text={'プロフィール編集'} onClick={openModal} />
            </div>
            <dl>
              <dt className={styles.title}>メールアドレス</dt>
              <dd className={styles.body}>{user.email}</dd>
            </dl>
            <div className={styles.controller}>
              <SecondaryButton
                text={'メールアドレス変更'}
                onClick={openChangeMailModal}
              />
            </div>
          </div>
        )}
      </div>
      <ProfileEditModal open={isOpenModal} close={closeModal} />
      <MailEditModal
        open={isOpenChangeMailModal}
        close={closeChangeMailModal}
      />
    </PageWrapper>
  );
};

export default Profile;
