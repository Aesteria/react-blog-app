export const formatDate = (createdDate: string): string => {
  const date = new Date(createdDate);
  const dateFormatted = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  return dateFormatted;
};
