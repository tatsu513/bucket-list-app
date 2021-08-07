interface Timestamp {
  nanoseconds: number;
  seconds: number;
}
export interface Options {
  id: string;
  name: string;
  order: number;
}

export interface User {
  age: number;
  birthday: Timestamp;
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

export interface Item {
  limitAge: number;
  category: string;
  completedAt: Date | null;
  createdAt: Date;
  itemId: string;
  limitDate: Date | null;
  order: number;
  priority: number;
  status: string;
  title: string;
  updatedAt: Date;
}

export interface ItemHeader {
  id: number;
  key: string;
  name: string;
  alignment: 'center' | 'left' | 'right';
}
