export interface Options {
  id: string;
  name: string;
  order: number;
}

export interface Item {
  age: number;
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
