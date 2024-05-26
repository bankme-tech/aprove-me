export const cleanObject = (obj: any): any => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      cleanObject(obj[key]);

      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    } else if (obj[key] === undefined || obj[key] === null) {
      delete obj[key];
    }
  });

  return obj;
};
