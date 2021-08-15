interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

export interface Options {
  [key: string]: string | number;
  name: string;
  order: number;
}

export interface User {
  age: number;
  birthday: Timestamp | Date;
  createdAt: Timestamp;
  email: string;
  gender: string;
  role: 'customer' | 'admin';
  uid: string;
  updatedAt: Timestamp;
  username: string;
}

export interface Gender {
  genderId: string;
  genderType: string;
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
  images?: Image[];
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

export interface ItemHeader {
  id: number;
  key: string;
  name: string;
  alignment: 'center' | 'left' | 'right';
}
