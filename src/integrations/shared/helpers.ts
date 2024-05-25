export const isEmptyOrNull = (field: any): boolean => {
  return field == null || field == undefined || field == '';
}

export const isValidDate = (dateString: string): boolean=>  {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && date.toISOString() === dateString;
}

export const mergeObjects = (target: Object, source: Object): string | unknown => {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (source[key] instanceof Object && key in target) {
        target[key] = mergeObjects(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>)
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}