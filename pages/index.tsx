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
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<Options[] | never[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('incomplete');
  const [categories, setCategories] = useState<Options[] | never[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [items, setItems] = useState<Item[] | never[]>([]);
  const [baseItems, setBaseItems] = useState<Item[] | never[]>([]);
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

  const inputTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    [setTitle],
  );

  const selectStatus = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedStatus(event.target.value);
    },
    [setSelectedStatus],
  );

  const selectCategory = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(event.target.value);
    },
    [setSelectedCategory],
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
    const getFilteringItems = (items: Item[]) => {
      if (
        selectedStatus === 'all' &&
        selectedCategory === 'all' &&
        title === ''
      ) {
        return items;
      } else {
        const statusFilteringItem =
          selectedStatus === 'all'
            ? items
            : items.filter((item) => {
                return item.status === selectedStatus;
              });
        const categoryFilterItem =
          selectedCategory === 'all'
            ? statusFilteringItem
            : statusFilteringItem.filter((item) => {
                return item.category === selectedCategory;
              });
        const titleFilteringItem =
          title === ''
            ? categoryFilterItem
            : categoryFilterItem.filter((item) => {
                return item.title.toLowerCase().includes(title);
              });
        return titleFilteringItem;
      }
    };
    if (baseItems.length === 0) {
      getItems(currentUser.uid).then((items) => {
        setBaseItems(items);
        const filteringItems = getFilteringItems(items);
        setItems(filteringItems);
      });
    } else {
      const filteringItems = getFilteringItems(baseItems);
      setItems(filteringItems);
    }
  }, [currentUser, isCreatedItem, title, selectedStatus, selectedCategory]);

  return (
    <>
      <Header username={user?.username} />
      <Filter
        status={status}
        categories={categories}
        priority={priority}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        title={title}
        onInputTitle={inputTitle}
        onSelectCategory={selectCategory}
        onSelectStatus={selectStatus}
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
