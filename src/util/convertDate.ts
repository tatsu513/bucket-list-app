const isInvalidDate = (date: Date) => {
  return Number.isNaN(date.getDate());
};

export const getToday = () => {
  const today = new Date();
  const convertToday = `${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
  return convertToday;
};

export const getDateFrom8Digit = (value: string) => {
  if (!value.match(/\d{8}/)) return null;
  const dateNumber = value.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (dateNumber) {
    const date = new Date(`${dateNumber[1]}-${dateNumber[2]}-${dateNumber[3]}`);
    return isInvalidDate(date) ? null : date;
  } else {
    return null;
  }
};
