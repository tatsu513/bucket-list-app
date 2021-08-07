import { db } from 'src/firebase';
import { useRouter } from 'next/router';
import {
  Gender,
  InitialDataForCreateUser,
  Item,
  Options,
  User,
} from 'src/types';

const router = useRouter();
const usersRef = db.collection('users');

export const createUser = (
  uid: string,
  initialData: InitialDataForCreateUser,
) => {
  db.collection('users')
    .doc(uid)
    .set(initialData)
    .then(() => {
      router.push('/');
    });
};

export const getAllStatus = () => {
  db.collection('status')
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
  db.collection('categories')
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
  usersRef
    .doc(uid)
    .get()
    .then((snapshots) => {
      const date = snapshots.data() as User;
      return date;
    });
};

export const getGenders = () => {
  db.collection('genders')
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
  usersRef
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
  usersRef.doc(uid).collection('items').doc().set(initialData);
};
