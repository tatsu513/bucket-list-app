import { useEffect, useState, useCallback } from 'react';
import firebase from 'firebase/app';
import { Item, Options, User } from 'src/types';
import { auth } from 'src/firebase';
import { deleteItem, getCategories, getItems, getUser } from 'src/api';
import { useRouter } from 'next/router';
import { Header } from 'src/components';
import {
  ThirdaryButton,
  SecondaryButton,
  PrimayButton,
} from 'src/components/buttons';
import { EditModal } from 'src/components/modals/';
import styles from 'src/assets/styles/modules/[id].module.scss';
import { convertDate } from 'src/plugins/dayjs';
import { getNameById } from 'src/util/common';

const ItemDetail: React.VFC = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [item, setItem] = useState<Item | undefined>(undefined);
  const [categories, setCategories] = useState<Options[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const deleteItemAction = useCallback(() => {
    if (!currentUser || !item) return;
    deleteItem(currentUser.uid, item.itemId).then(() => {
      router.push('/');
    });
  }, [currentUser, item]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/account/signin');
    });
    getCategories().then((value) => setCategories(value));
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    getUser(currentUser.uid).then((user) => setUser(user));
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    getItems(currentUser.uid).then((items) => {
      const itemId = router.query;
      const foundItem: Item | undefined = items.find(
        (item) => item.itemId === itemId.id,
      );
      setItem(foundItem);
    });
  }, [currentUser, isOpen]);
  return (
    <>
      <Header username={user?.username} />
      <div className={styles.itemBox}>
        {item && (
          <>
            <div className={styles.head}>
              <div className={styles.headText}>
                <div className={styles.headTitle}>{item.title || '-'}</div>
                <div className={styles.headDate}>
                  <span className={styles.dateItem}>
                    設定日：{convertDate(item.createdAt)}
                  </span>
                </div>
              </div>
              <div className={styles.headController}>
                <div className={styles.headControllerButton}>
                  <ThirdaryButton text={'削除'} onClick={deleteItemAction} />
                </div>
                <SecondaryButton text={'編集'} onClick={openModal} />
              </div>
            </div>
            <div className={styles.body}>
              <ul>
                <li className={styles.bodyItem}>
                  <span className={styles.bodyItemLabel}>重要度</span>
                  <span>あああああ</span>
                </li>
                <li className={styles.bodyItem}>
                  <span className={styles.bodyItemLabel}>期限</span>
                  <span>{convertDate(item.limitDate)}</span>
                </li>
                <li className={styles.bodyItem}>
                  <span className={styles.bodyItemLabel}>カテゴリ</span>
                  <span>
                    {getNameById(categories, item.category, 'category')}
                  </span>
                </li>
                <li className={styles.bodyItem}>
                  <span className={styles.bodyItemLabel}>備考</span>
                  <span>{item.memo}</span>
                </li>
              </ul>
            </div>
            <div className={styles.bodyButtonBox}>
              <PrimayButton
                text={'アイテムを完了'}
                onClick={() => alert('完了する')}
              />
            </div>
          </>
        )}
      </div>
      {item && user && categories && (
        <EditModal
          categories={categories}
          item={item}
          user={user}
          open={isOpen}
          close={closeModal}
        />
      )}
    </>
  );
};

export default ItemDetail;
