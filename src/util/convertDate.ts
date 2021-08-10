const isInvalidDate = (date: Date) => {
  return Number.isNaN(date.getDate());
};

export const convertTo8Digit = (date: Date) => {
  const convertedDate = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
  return convertedDate;
};

export const getToday = () => {
  const today = new Date();
  return convertTo8Digit(today);
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

export const getDateAtCalc = (date8Digit: string, addNumber: number) => {
  const convertedDate = getDateFrom8Digit(date8Digit);
  if (!convertedDate) return;
  const result = convertedDate.setFullYear(
    convertedDate.getFullYear() + addNumber,
  );
  const resultToDate = new Date(result);
  return convertTo8Digit(resultToDate);
};
