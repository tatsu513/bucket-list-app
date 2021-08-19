import { ItemHeader } from 'src/types';

export const itemsHeader: ItemHeader[] = [
  {
    id: 1,
    key: 'title',
    name: '内容',
    alignment: 'left',
  },
  {
    id: 2,
    key: 'limitDate',
    name: '期限',
    alignment: 'center',
  },
  {
    id: 3,
    key: 'status',
    name: '状態',
    alignment: 'center',
  },
  {
    id: 4,
    key: 'priority',
    name: '重要度',
    alignment: 'center',
  },
];

export const defaultCategories = [
  {
    categoryId: 'business',
    name: '仕事',
    order: 1,
  },
  {
    categoryId: 'private',
    name: 'プライベート',
    order: 1,
  },
  {
    categoryId: 'family',
    name: '家族',
    order: 1,
  },
  {
    categoryId: 'friend',
    name: '友人',
    order: 1,
  },
];
