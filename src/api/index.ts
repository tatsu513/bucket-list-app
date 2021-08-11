import { db } from 'src/firebase';
import { EditingItem, Gender, Item, Options, User } from 'src/types';

const usersRef = db.collection('users');

export const createUser = (uid: string, initialData: User) => {
  return db.collection('users').doc(uid).set(initialData);
};

export const getAllStatus = () => {
  return db
    .collection('status')
    .orderBy('order', 'asc')
    .get()
    .then((snapshots) => {
      const list: Options[] = [];
      snapshots.forEach((snapshot) => {
        const data = snapshot.data();
        list.push({
          statusId: data.statusId,
          name: data.name,
          order: data.order,
        });
      });
      return list;
    });
};

export const getCategories = () => {
  return db
    .collection('categories')
    .orderBy('order', 'asc')
    .get()
    .then((snapshots) => {
      const list: Options[] = [];
      snapshots.forEach((snapshot) => {
        const data = snapshot.data();
        list.push({
          categoryId: data.categoryId,
          name: data.name,
          order: data.order,
        });
      });
      return list;
    });
};

export const getUser = (uid: string) => {
  return usersRef
    .doc(uid)
    .get()
    .then((snapshots) => {
      const date = snapshots.data() as User;
      return date;
    });
};

export const getGenders = () => {
  return db
    .collection('genders')
    .orderBy('order', 'asc')
    .get()
    .then((snapshots) => {
      const list: Gender[] = [];
      snapshots.forEach((snapshot) => {
        const data = snapshot.data();
        list.push({
          genderId: data.genderId,
          genderType: data.genderType,
        });
      });
      return list;
    });
};

export const getItems = (uid: string) => {
  return usersRef
    .doc(uid)
    .collection('items')
    .orderBy('order', 'asc')
    .get()
    .then((snapshots) => {
      const list: Item[] = [];
      snapshots.forEach((snapshot) => {
        const data = snapshot.data();
        list.push({
          limitAge: data.limitAge,
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
          memo: data.memo,
        });
      });
      return list;
    });
};

export const createItem = (uid: string, initialData: Item) => {
  const itemRef = usersRef.doc(uid).collection('items').doc();
  const gotId = itemRef.id;
  initialData.itemId = gotId;
  return itemRef.set(initialData).then(() => {
    return true;
  });
};

export const updateItem = (uid: string, iid: string, data: EditingItem) => {
  return usersRef
    .doc(uid)
    .collection('items')
    .doc(iid)
    .set(data, { merge: true });
};

export const deleteItem = (uid: string, iid: string) => {
  return db.collection('users').doc(uid).collection('items').doc(iid).delete();
};
