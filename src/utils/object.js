export const shallowEquals = (obj1, obj2) => {
  return Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every((key) =>
    obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
  );
};
