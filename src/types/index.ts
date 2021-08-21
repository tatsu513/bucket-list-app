import firebase from 'firebase/app';
interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

export interface Options {
  [key: string]: string | number;
  name: string;
  order: number;
}

export interface ChangeEmailParams {
  oldEmail: string;
  email: string;
  password: string;
}

export interface User {
  age: number;
  birthday: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
  email: string;
  gender: string;
  role: 'customer' | 'admin';
  uid: string;
  updatedAt: firebase.firestore.Timestamp;
  username: string;
}

export interface Image {
  id: string;
  path: string;
}

export interface Item {
  limitAge: number | null;
  category: string;
  completedAt: Date | null;
  createdAt: Timestamp;
  itemId: string;
  limitDate: Date | Timestamp | null;
  order: number;
  priority: number;
  status: string;
  title: string;
  updatedAt: Timestamp;
  memo: string;
}

export interface EditingItem {
  category: string;
  limitAge: number | null;
  limitDate: Date | Timestamp | null;
  memo: string;
  priority: number;
  title: string;
  updatedAt: Timestamp;
}

export interface CompletedItem {
  completedAt: Date;
  images: Image[] | never[];
  limitAge: number;
  limitDate: Date | Timestamp;
  status: 'completed';
  comment: string;
  updatedAt: Timestamp;
}

export interface FixedData {
  limitAge: number;
  category: string;
  completedAt: Date;
  createdAt: Timestamp;
  images: Image[] | never[];
  itemId: string;
  limitDate: Date | Timestamp;
  order: number;
  priority: number;
  status: 'completed';
  title: string;
  updatedAt: Timestamp;
  memo: string;
  comment: string;
}

export interface ItemHeader {
  id: number;
  key: string;
  name: string;
  alignment: 'center' | 'left' | 'right';
}
