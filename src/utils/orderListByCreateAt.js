export const orderByCreated = list => {
  return list && list.sort((a, b) => new Date(b.created) - new Date(a.created));
};
