import { Options } from 'src/types';

export const getUniqueId = (myStrong?: number): string => {
  let strong = 1000;
  if (myStrong) strong = myStrong;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
};

export const getIdByName = (
  items: Options[],
  name: string,
  itemName = 'id',
) => {
  const target = items.find((item: Options) => item.name === name);
  return target ? target[`${itemName}Id`] : '';
};

export const getNameById = (
  items: Options[] | null,
  id: string,
  itemName = 'id',
) => {
  if (!items) return;
  const target = items.find((item: Options) => item[`${itemName}Id`] === id);
  return target ? target.name : null;
};
