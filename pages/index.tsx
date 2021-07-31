import { useState, useCallback, useEffect } from 'react';
import firebase from 'firebase/app';
import { Filter, List } from '../src/components';
import { FloatButton } from 'src/components/buttons/';
import styles from 'src/assets/styles/modules/Home.module.scss';
import { AddModal } from 'src/components/modals';
import { auth, db } from 'src/firebase';
import { useRouter } from 'next/router';
import { Options } from 'src/types/common';

const home = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [status, setStatus] = useState<Options[] | never[]>([]);
  const [categories, setCategories] = useState<Options[] | never[]>([]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/account/signin');
    });
  }, []);

  useEffect(() => {
    db.collection('status')
      .orderBy('order', 'asc')
      .get()
      .then((snapshots) => {
        const list: Options[] = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
            order: data.order,
          });
        });
        setStatus(list);
      });
  }, []);

  useEffect(() => {
    console.log(currentUser);
    if (!currentUser) return;
    db.collection('users')
      .doc(currentUser.uid)
      .collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then((snapshots) => {
        const list: Options[] = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
            order: data.order,
          });
        });
        setCategories(list);
      });
  }, [currentUser]);

  return (
    <>
      <Filter status={status} categories={categories} />
      <div className={styles.container}>
        <List />
      </div>
      <AddModal open={isOpen} close={closeModal} title={'リストに追加'} />
      <FloatButton text={'リストに追加'} onClick={openModal} />
    </>
  );
};

export default home;
