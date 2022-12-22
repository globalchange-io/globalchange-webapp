export const arrayKill = (array, target, name) => {
  const itemToRemoveIndex = array.findIndex((item) => {
    return item[name] === target;
  });

  if (itemToRemoveIndex !== -1) {
    return array.splice(itemToRemoveIndex, 1);
  }
};
