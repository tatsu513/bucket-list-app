import styles from 'src/assets/styles/modules/Profile.module.scss';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { Header, PageTitle, PageWrapper } from 'src/components';
import { Person, Face, AddPhotoAlternate } from '@material-ui/icons';
import { SecondaryButton } from 'src/components/buttons';
import { useState } from 'react';
import { MailEditModal, ProfileEditModal } from 'src/components/modals';
import { useCallback, useEffect } from 'react';
import { auth, storage } from 'src/firebase';
import { getGenders, getUser } from 'src/api';
import { Options, User } from 'src/types';
import { getNameById } from 'src/util/common';
import { convertToDisplayDate } from 'src/util/convertDate';

const Profile: React.VFC = () => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [image, setImage] = useState('');
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

  const changeProfileImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      const file = event.target.files[0];
      const fileName = file.name;
      const user = auth.currentUser;

      if (!user) return;

      const storageRef = storage.ref().child(`profile/${fileName}`);
      const uploadTask = storageRef.put(file);

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          user.updateProfile({ photoURL: downloadUrl }).then(() => {
            setImage(downloadUrl);
          });
        });
      });
    },
    [],
  );

  const imagePath = {
    backgroundImage: `url('${image}')`,
    backgroundSize: '100%',
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (!user) {
        router.push('/account/signin');
      } else {
        setCurrentUser(user);
        setImage(user.photoURL ? user.photoURL : '');
      }
    });
    getGenders().then((genders) => setGenders(genders));
  }, []);
  useEffect(() => {
    if (!currentUser || isOpenModal || isOpenChangeMailModal) return;
    getUser(currentUser.uid).then((user) => setUser(user));
    setCurrentUser(auth.currentUser);
  }, [currentUser, isOpenModal, isOpenChangeMailModal]);
  return (
    <PageWrapper>
      <Header username={user?.username} />
      <PageTitle title={'プロフィール'}>
        <Person fontSize={'inherit'} />
      </PageTitle>
      {user && (
        <div className={styles.profileBox}>
          <div className={styles.profileImageBox}>
            <span className={styles.profileImage} style={imagePath}>
              {image === '' && <Face fontSize={'inherit'} />}
            </span>
            <div className={styles.addImage}>
              <label className={styles.uploadLabel} htmlFor="file-upload">
                <span className={styles.labelText}>画像を変更</span>
                <input
                  className={styles.uploadInput}
                  id="file-upload"
                  type="file"
                  onChange={(event) => changeProfileImage(event)}
                ></input>
              </label>
            </div>
          </div>
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
              <dd className={styles.body}>{currentUser?.email}</dd>
            </dl>
            <div className={styles.controller}>
              <SecondaryButton
                text={'メールアドレス変更'}
                onClick={openChangeMailModal}
              />
            </div>
          </div>
        </div>
      )}
      {user && (
        <>
          <ProfileEditModal user={user} open={isOpenModal} close={closeModal} />
          <MailEditModal
            email={user.email}
            open={isOpenChangeMailModal}
            close={closeChangeMailModal}
          />
        </>
      )}
    </PageWrapper>
  );
};

export default Profile;
