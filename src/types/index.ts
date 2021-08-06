export interface Options {
  id: string;
  name: string;
  order: number;
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
