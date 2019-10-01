export const calculateTotal = transactions => {
  if (!transactions) return 0;

  return transactions.reduce((acc, item) => {
    return (
      Number(acc) +
      Number(item.transactionValue.replace(/[^0-9,-]+/g, '').replace(',', '.'))
    );
  }, 0);
};
