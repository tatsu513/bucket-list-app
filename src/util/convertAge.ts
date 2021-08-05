export const getAge = (date: Date | null) => {
  if (!date) return;
  const today = new Date();
  const thisYearBirthday = new Date(
    today.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  let diff = today.getFullYear() - date.getFullYear();
  return today < thisYearBirthday ? diff-- : diff;
};

export const getFeatureAge = (date: Date, age: number) => {
  const today = new Date();
  const thisYearBirthday = new Date(
    today.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const diff = date.getFullYear() - today.getFullYear();
  return today < thisYearBirthday ? age + diff - 1 : age + diff;
};
