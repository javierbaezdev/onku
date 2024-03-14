export interface QueryObject {
  [key: string]: string | number | boolean | null | undefined;
}

export default function formatQuery(obj?: QueryObject): QueryObject {
  const formattedObj: QueryObject = {};

  if (!obj) {
    return formattedObj;
  }

  Object.keys(obj).forEach((propName) => {
    const propValue = obj[propName];

    if (propValue !== null && propValue !== undefined && propValue !== '') {
      formattedObj[propName] = propValue;
    }
  });

  return formattedObj;
}
