import { fields, convertStringToArray, convertArrayToObject, filterRestricted, sort } from "./mongodb-util.js";

describe("field", () => {
  it("convert string to array", async () => {
    expect(convertStringToArray("name, password")).toStrictEqual(["name", "password"]);
  });

  it("convert array to mongodb field object", async () => {
    expect(convertArrayToObject(["name", "password"])).toStrictEqual({
      name: 1,
      password: 1,
    });
  });

  it("add restricted fields to the object", async () => {
    const obj = { name: 1, password: 1 };
    const restricted = ["password"];
    const result = {
      ...obj,
      ...filterRestricted(obj, restricted),
    };
    expect(result).toStrictEqual({
      name: 1,
      password: 0,
    });
  });

  it("filter fields", async () => {
    const result = fields("", ["password"]);
    expect(result).toStrictEqual({
      password: 0,
    });
  });
});

describe("sort", () => {
  it("convert string to mongodb sort object", async () => {
    expect(sort("name,-address")).toStrictEqual({
      name: 1,
      address: -1,
    });
  });
});
