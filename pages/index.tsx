import { useState, useCallback, useEffect } from 'react';
import firebase from 'firebase/app';
import { Header } from '../src/components';
import { Filter, List } from '../src/components';
import { FloatButton } from 'src/components/buttons/';
import styles from 'src/assets/styles/modules/Home.module.scss';
import { AddModal } from 'src/components/modals';
import { auth } from 'src/firebase';
import { useRouter } from 'next/router';
import { Item, Options, User } from 'src/types';
import { getAllStatus, getCategories, getItems, getUser } from 'src/api';

const home = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [status, setStatus] = useState<Options[] | never[]>([]);
  const [categories, setCategories] = useState<Options[] | never[]>([]);
  const [items, setItems] = useState<Item[] | never[]>([]);
  const [isCreatedItem, setIsCreatedItem] = useState(false);
  const [priority, setPriority] = useState(3);

  const openModal = () => {
    setIsOpen(true);
    setIsCreatedItem(false);
  };
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const selectedPriority = useCallback(
    (selectedPriority: number) => {
      const oldValue = priority;
      if (selectedPriority - oldValue <= 0) {
        if (selectedPriority !== 1) {
          setPriority(selectedPriority - 1);
        }
      } else {
        setPriority(selectedPriority);
      }
    },
    [setPriority, priority],
  );

  const toggleCreatedStatus = useCallback(
    (flag: boolean) => {
      setIsCreatedItem(flag);
    },
    [setIsCreatedItem],
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/account/signin');
    });
    getAllStatus().then((value) => setStatus(value));
    getCategories().then((value) => setCategories(value));
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    getUser(currentUser.uid).then((user) => setUser(user));
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    getItems(currentUser.uid).then((items) => setItems(items));
  }, [currentUser, isCreatedItem]);

  return (
    <>
      <Header username={user?.username} />
      <Filter
        status={status}
        categories={categories}
        priority={priority}
        onClick={selectedPriority}
      />
      <div className={styles.container}>
        <List categories={categories} items={items} status={status} />
      </div>
      <AddModal
        age={user ? user.age : 0}
        uid={user ? user.uid : ''}
        open={isOpen}
        close={closeModal}
        title={'リストに追加'}
        categories={categories}
        status={status}
        toggleCreatedStatus={toggleCreatedStatus}
      />
      <FloatButton text={'リストに追加'} onClick={openModal} />
    </>
  );
};

export default home;
