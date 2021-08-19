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
  const [isAllpriority, setIsAllPriority] = useState(true);

  const openModal = () => {
    setIsOpen(true);
    setIsCreatedItem(false);
  };
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const selectedPriority = useCallback(
    (selectedPriority: number) => {
      setPriority(selectedPriority);
    },
    [setPriority],
  );

  const handleIsAllPriority = useCallback(() => {
    setIsAllPriority(!isAllpriority);
  }, [isAllpriority]);

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
        title === '' &&
        isAllpriority
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
        const priorityFilteringItem = isAllpriority
          ? titleFilteringItem
          : titleFilteringItem.filter((item) => {
              console.log(item.priority, priority);
              return item.priority === priority;
            });
        return priorityFilteringItem;
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
  }, [
    currentUser,
    isCreatedItem,
    title,
    selectedStatus,
    selectedCategory,
    priority,
    isAllpriority,
  ]);

  return (
    <>
      <Header username={user?.username} />
      <Filter
        status={status}
        categories={categories}
        isAllpriority={isAllpriority}
        priority={priority}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        title={title}
        onInputTitle={inputTitle}
        onSelectCategory={selectCategory}
        onSelectStatus={selectStatus}
        onClick={selectedPriority}
        onClickIsAllPriority={handleIsAllPriority}
      />
      <div className={styles.container}>
        <List categories={categories} items={items} status={status} />
      </div>
      <AddModal
        age={user ? user.age : 0}
        categories={categories}
        itemLength={baseItems.length}
        uid={user ? user.uid : ''}
        open={isOpen}
        title={'リストに追加'}
        status={status}
        close={closeModal}
        toggleCreatedStatus={toggleCreatedStatus}
      />
      <FloatButton text={'リストに追加'} onClick={openModal} />
    </>
  );
};

export default home;
