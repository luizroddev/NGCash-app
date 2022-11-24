export const formatDate = (parameterDate: Date) => {
  const date = new Date(parameterDate);
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};
