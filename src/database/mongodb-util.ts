/**
 * Convert string param to mongodb field object
 *
 * @example
 * fields("name, address") // => { name: 1, address: 1 }
 */
export function fields(fields = "", restrictedFields = []) {
  let obj: any = {};

  if (fields) {
    let arrayOfFields = convertStringToArray(fields);
    arrayOfFields = filterRestricted(arrayOfFields, restrictedFields);

    obj = {
      ...convertArrayToObject(arrayOfFields),
    };
  }

  /**
   * Remove restricted fields
   * ex: { password: 0 }
   */
  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    for (let i = 0; i < restrictedFields.length; i++) {
      obj[`${restrictedFields[i]}`] = 0;
    }
  }

  return obj;
}

/**
 * Convert string to array
 *
 * @example
 * convertStringToArray("name, address") // => ["name", "address"]
 */
export function convertStringToArray(fields: string) {
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
export function convertArrayToObject(array: Array<string>) {
  const obj: any = {};
  for (let i = 0; i < array.length; i++) {
    obj[`${array[i].trim()}`] = 1;
  }
  return obj;
}

/**
 * Remove restricted fields from array
 *
 * @example
 * filterRestricted({ name: 1, password: 1}, ["password"]) => { name: 1, password: 0 }
 */
export function filterRestricted(fields: any, restrictedFields: any) {
  return fields.filter((val: any) => !restrictedFields.includes(val.trim()));
}

/**
 * Remove restricted fields
 *
 * @example
 * ex: { password: 0 }
 */
export function addRestricted(obj: any, restrictedFields: Array<string>) {
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
export function sort(fields: string) {
  if (!fields) return null;
  const hash: any = {};
  let c;
  fields.split(",").forEach(function (field) {
    c = field.charAt(0);
    if (c === "-") field = field.substring(1);
    hash[field.trim()] = c === "-" ? -1 : 1;
  });
  return hash;
}
