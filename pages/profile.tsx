import styles from 'src/assets/styles/modules/Profile.module.scss';
import { Header, PageTitle, PageWrapper } from 'src/components';
import { Person, Face } from '@material-ui/icons';
import { SecondaryButton } from 'src/components/buttons';
import { useState } from 'react';
import { ProfileEditModal } from 'src/components/modals';
import { useCallback } from 'react';

const Profile: React.VFC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);
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
        <div className={styles.profileContent}>
          <dl>
            <dt className={styles.title}>ユーザーネーム</dt>
            <dd className={styles.body}>たっつん</dd>
            <dt className={styles.title}>生年月日</dt>
            <dd className={styles.body}>1990/05/13</dd>
            <dt className={styles.title}>メールアドレス</dt>
            <dd className={styles.body}>0285mashiko@gmail.com</dd>
            <dt className={styles.title}>性別</dt>
            <dd className={styles.body}>男性</dd>
          </dl>
          <div className={styles.controller}>
            <SecondaryButton text={'編集する'} onClick={openModal} />
          </div>
        </div>
      </div>
      <ProfileEditModal open={isOpenModal} close={closeModal} />
    </PageWrapper>
  );
};

export default Profile;
