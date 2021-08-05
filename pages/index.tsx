import { useState, useCallback, useEffect } from 'react';
import firebase from 'firebase/app';
import { Filter, List } from '../src/components';
import { FloatButton } from 'src/components/buttons/';
import styles from 'src/assets/styles/modules/Home.module.scss';
import { AddModal } from 'src/components/modals';
import { auth, db } from 'src/firebase';
import { useRouter } from 'next/router';
import { Item, Options } from 'src/types';

const home = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [status, setStatus] = useState<Options[] | never[]>([]);
  const [categories, setCategories] = useState<Options[] | never[]>([]);
  const [items, setItems] = useState<Item[] | never[]>([]);
  const usersRef = db.collection('users');

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
    if (!currentUser) return;
    db.collection('categories')
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

  useEffect(() => {
    if (!currentUser) return;
    db.collection('users')
      .doc(currentUser.uid)
      .get()
      .then((snapshots) => {
        setUser(snapshots.data());
      });
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    usersRef
      .doc(currentUser.uid)
      .collection('items')
      .orderBy('order', 'asc')
      .get()
      .then((snapshots) => {
        const list: Item[] = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            age: data.age,
            category: data.category,
            completedAt: data.completedAt,
            createdAt: data.createdAt,
            itemId: data.itemId,
            limitDate: data.limitDate,
            order: data.order,
            priority: data.priority,
            status: data.status,
            title: data.title,
            updatedAt: data.updatedAt,
          });
        });
        setItems(list);
      });
  }, [currentUser]);

  return (
    <>
      <Filter status={status} categories={categories} />
      <div className={styles.container}>
        <List items={items} />
      </div>
      <AddModal
        age={user ? user.age : 0}
        open={isOpen}
        close={closeModal}
        title={'リストに追加'}
        categories={categories}
      />
      <FloatButton text={'リストに追加'} onClick={openModal} />
    </>
  );
};

export default home;
