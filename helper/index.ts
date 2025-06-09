const valueIsObject = (obj: any) => {
  return !Array.isArray(obj) && typeof obj === "object" && obj !== null;
};
export const filterObjectByKey = (
  query: any,
  obj: any
): object | Array<any> => {
  const q = query.toLowerCase().trim();

  if (valueIsObject(obj)) {
    let buffer: Record<string, any> = {};
    for (let key in obj) {
      if (key.toLowerCase().includes(q) || valueIsObject(obj[key])) {
        if (valueIsObject(obj[key])) {
          let filteredValueObject = filterObjectByKey(q, obj[key]);
          if (Object.keys(filteredValueObject).length !== 0) {
            buffer[key] = filteredValueObject;
          }
        }

        if (key.toLowerCase().includes(q)) {
          buffer[key] = obj[key];
        }
      }
    }
    return buffer;
  } else if (Array.isArray(obj)) {
    return obj.map((n) => filterObjectByKey(q, n));
  }
  // Default return to satisfy return type
  return {};
};
