import dayjs from 'dayjs';

export const convertDate = (date: any) => {
  if (!date) return '-';
  const toDate = date.toDate();
  return dayjs(toDate).format('YYYY/MM/DD');
};

export const getYear = (date: any) => {
  const toDate = date.toDate();
  return dayjs(toDate).format('YYYY');
};
