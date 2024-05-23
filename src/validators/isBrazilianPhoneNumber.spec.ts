import { isBrazilianPhoneNumber } from "./isBrazilianPhoneNumber";

describe("isBrazilianPhoneNumber", () => {
  it("should return false if value does not match the expected format", () => {
    const result = isBrazilianPhoneNumber("incorrect format");
    expect(result).toBe(false);
  });

  it("should return true if value match the expected format", () => {
    const result = isBrazilianPhoneNumber("+55 (00) 0 0000-0000");
    expect(result).toBe(true);
  });
});
