import { useEffect, useState, useCallback } from 'react';
import firebase from 'firebase/app';
import { Item, Options, User } from 'src/types';
import { auth } from 'src/firebase';
import { deleteItem, getCategories, getItems, getUser } from 'src/api';
import { useRouter } from 'next/router';
import { FixedStars } from 'src/components';
import {
  ThirdaryButton,
  SecondaryButton,
  PrimayButton,
} from 'src/components/buttons';
import { CompleteModal, EditModal } from 'src/components/modals/';
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
  const [isOpenCompleteModal, setIsOpenCompleteModal] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const closeCompletModal = useCallback(() => {
    setIsOpenCompleteModal(false);
  }, [setIsOpenCompleteModal]);

  const openComplatModal = useCallback(() => {
    setIsOpenCompleteModal(true);
  }, [setIsOpenCompleteModal]);

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
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const uid = currentUser.uid;
    getUser(uid).then((user) => setUser(user));
    getCategories(uid).then((value) => setCategories(value));
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
                <li className={`${styles.bodyItem} ${styles.bodyItemPriority}`}>
                  <span className={styles.bodyItemLabel}>重要度</span>
                  <span className={styles.bodyItemText}>
                    <FixedStars priority={item.priority} size={30} />
                  </span>
                </li>
                <li className={styles.bodyItem}>
                  <span className={styles.bodyItemLabel}>期限</span>
                  <span className={styles.bodyItemText}>
                    {convertDate(item.limitDate)}
                  </span>
                </li>
                <li className={styles.bodyItem}>
                  <span className={styles.bodyItemLabel}>カテゴリ</span>
                  <span className={styles.bodyItemText}>
                    {getNameById(categories, item.category, 'category')}
                  </span>
                </li>
                <li className={styles.bodyItem}>
                  <span className={styles.bodyItemLabel}>備考</span>
                  <span className={styles.bodyItemText}>{item.memo}</span>
                </li>
              </ul>
            </div>
            <div className={styles.bodyButtonBox}>
              <PrimayButton
                text={'アイテムを完了'}
                onClick={openComplatModal}
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
      {item && user && isOpenCompleteModal && (
        <CompleteModal
          item={item}
          user={user}
          open={isOpenCompleteModal}
          close={closeCompletModal}
        />
      )}
    </>
  );
};

export default ItemDetail;
