import { BadRequestException } from "@nestjs/common";
import { z } from "zod";

import { ZodPipe } from "./zod.pipe";

describe("ZodPipe", () => {
  it("should throw BadRequestException if validation fails", () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
      dev: z.boolean(),
    });

    const zodPipe = new ZodPipe(schema);
    const input = { name: 10, age: "matheus", dev: {} };
    const message = `Expected string, received number, Expected number, received string, and Expected boolean, received object`;
    const badRequestException = new BadRequestException(message);
    expect(() => zodPipe.transform(input)).toThrow(badRequestException);
  });

  it("should return the parsed data when success", () => {
    const schema = z.object({ name: z.string().toUpperCase() });
    const zodPipe = new ZodPipe(schema);
    const input = { name: "matheus", age: 10 };
    expect(zodPipe.transform(input)).toEqual({ name: "MATHEUS" });
  });
});
