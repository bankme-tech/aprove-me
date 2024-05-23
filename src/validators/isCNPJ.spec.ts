import { isCNPJ } from "./isCNPJ";

describe("isCNPJ", () => {
  it("should return false if value does not match the expected format", () => {
    const result = isCNPJ("incorrect format");
    expect(result).toBe(false);
  });

  it("should return true if value match the expected format", () => {
    const result = isCNPJ("00.000.000/0000-00");
    expect(result).toBe(true);
  });
});
