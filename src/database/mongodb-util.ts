/**
 * Convert string param to mongodb field object
 *
 * @example
 * fields("name, address")  // => { name: 1, address: 1}
 */
export function fields(fields = "", restrictedFields = []) {
  const obj: any = {};
  if (fields) {
    /**
     * Convert string to array
     * ex: 'username, firstName, lastName => ['username', 'firstName', 'lastName']
     */
    let arrayOfFields = fields.split(",");
    arrayOfFields = filterRestrictedFields(arrayOfFields, restrictedFields);

    /**
     * Convert array to object
     * ex:['username', 'firstName', 'lastName'] to { username: 1, firstName: 1, lastName: 1 }
     */

    for (let i = 0; i < arrayOfFields.length; i++) {
      obj[`${arrayOfFields[i].trim()}`] = 1;
    }
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
 * Convert string param to mongodb sort object
 *
 * @example
 * sort("name, -createdAt")   // => { name: 1, createdAt: -1 }
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

// remove restricted fields from array
function filterRestrictedFields(arrayOfFields: any, restrictedFields: any) {
  return arrayOfFields.filter((val: any) => !restrictedFields.includes(val.trim()));
}
