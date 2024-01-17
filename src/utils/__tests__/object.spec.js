import { shallowEquals } from "../object";

describe("object utils", () => {
  describe("shallowEquals", () => {
    let obj1;
    let obj2;

    it("throws an error when either obj is null or undefined", () => {
      obj1 = { a: 1, b: 2 };
      obj2 = null;
      expect(() => {
        shallowEquals(obj1, obj2);
      }).toThrow("Cannot convert undefined or null to object");
    });

    it("returns false when objects have different number of keys", () => {
      obj1 = { a: 1, b: 2 };
      obj2 = { a: 1, b: 2, c: 3 };
      expect(shallowEquals(obj1, obj2)).toEqual(false);
    });

    it("returns false when objects have different keys", () => {
      obj1 = { a: 1, b: 2 };
      obj2 = { a: 1, c: 2 };
      expect(shallowEquals(obj1, obj2)).toEqual(false);
    });

    it("returns false when objects have different values for same keys", () => {
      obj1 = { a: 1, b: 2 };
      obj2 = { a: 1, b: 3 };
      expect(shallowEquals(obj1, obj2)).toEqual(false);
    });

    it("returns true when objects have the same number of keys and same values for same keys", () => {
      obj1 = { a: 1, b: 2, c: 3 };
      obj2 = { a: 1, b: 2, c: 3 };
      expect(shallowEquals(obj1, obj2)).toEqual(true);
    });
  });
});
