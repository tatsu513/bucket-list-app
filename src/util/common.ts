import { Options } from 'src/types';

export const getUniqueId = (myStrong?: number): string => {
  let strong = 1000;
  if (myStrong) strong = myStrong;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
};

export const getIdByName = (items: Options[], name: string) => {
  const target = items.find((item: Options) => item.name === name);
  return target ? target.id : null;
};
