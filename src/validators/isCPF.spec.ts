import { isCPF } from "./isCPF";

describe("isCPF", () => {
  it("should return false if value does not match the expected format", () => {
    const result = isCPF("incorrect format");
    expect(result).toBe(false);
  });

  it("should return true if value match the expected format", () => {
    const result = isCPF("000.000.000-00");
    expect(result).toBe(true);
  });
});
