interface IFieldsObject {
  [key: string]: number;
}

interface ISortObject {
  [key: string]: number;
}

/**
 * Convert string param to mongodb field object
 *
 * @example
 * fields("name, address") // => { name: 1, address: 1 }
 */
export function fields(fields = "", restrictedFields: Array<string> = []): IFieldsObject {
  const obj: IFieldsObject = convertArrayToObject(convertStringToArray(fields));

  return filterRestricted(obj, restrictedFields);
}

/**
 * Convert string to array
 *
 * @example
 * convertStringToArray("name, address") // => ["name", "address"]
 */
export function convertStringToArray(fields: string): Array<string> {
  return fields
    .split(" ")
    .join()
    .split(",")
    .filter((el) => el);
}

/**
 * Convert array to mongodb field object
 *
 * @example
 * convertArrayToObject(["name", "address"]) // => { name: 1, address: 1 }
 */
export function convertArrayToObject(array: Array<string>): IFieldsObject {
  const obj: IFieldsObject = {};
  for (let i = 0; i < array.length; i++) {
    obj[`${array[i].trim()}`] = 1;
  }
  return obj;
}

/**
 * Remove restricted fields
 *
 * @example
 * ex: { password: 0 }
 */
export function filterRestricted(obj: IFieldsObject, restrictedFields: Array<string>): IFieldsObject {
  for (let i = 0; i < restrictedFields.length; i++) {
    obj[`${restrictedFields[i]}`] = 0;
  }
  return obj;
}

/**
 * Convert string param to mongodb sort object
 *
 * @example
 * sort("name, -createdAt") // => { name: 1, createdAt: -1 }
 */
export function sort(fields: string): ISortObject {
  const obj: ISortObject = {};
  fields.split(",").forEach(function (field) {
    if (field.charAt(0) === "-") {
      field = field.substring(1);
      obj[field.trim()] = -1;
    } else {
      obj[field.trim()] = 1;
    }
  });
  return obj;
}
