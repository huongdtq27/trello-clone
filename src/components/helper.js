export const reOrderList = (list, startIndex, endIndex) => {
  const orderdList = Array.from(list);
  const [removedItem] = orderdList.splice(startIndex, 1);
  orderdList.splice(endIndex, 0, removedItem);

  return orderdList;
};
