export const addOrRemove = (key, list) => {
  let newList = [...list];
  if (newList.includes(key)) {
    let idx = newList.indexOf(key);
    newList = newList.slice(0, idx).concat(newList.slice(idx + 1));
  } else {
    newList.push(key);
  }

  return newList;
}