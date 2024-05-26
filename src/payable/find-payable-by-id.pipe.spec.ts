import { BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { Payable } from "@prisma/client";

import { PrismaProvider } from "../providers/prisma.provider";
import { FindPayableByIdPipe } from "./find-payable-by-id.pipe";

const payable: Payable = {
  id: "id",
  value: 10,
  emissionDate: new Date("2024-05-26"),
  assignorId: "assignorId",
};

describe("FindPayableByIdPipe", () => {
  let findPayableByIdPipe: FindPayableByIdPipe;
  let prisma: PrismaProvider;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindPayableByIdPipe,
        {
          provide: PrismaProvider,
          useValue: { payable: { findUnique: async () => payable } },
        },
      ],
    }).compile();

    findPayableByIdPipe = moduleRef.get(FindPayableByIdPipe);
    prisma = moduleRef.get(PrismaProvider);
  });

  it("should be defined", async () => {
    expect(findPayableByIdPipe).toBeDefined();
  });

  it("should find payable by id", async () => {
    const value = "uuid";

    const expectedArgs: Parameters<PrismaProvider["payable"]["findUnique"]> = [
      { where: { id: value } },
    ];

    const findUniqueSpy = jest.spyOn(prisma.payable, "findUnique");
    await findPayableByIdPipe.transform(value);
    expect(findUniqueSpy).toHaveBeenCalledTimes(1);
    expect(findUniqueSpy).toHaveBeenCalledWith(...expectedArgs);
  });

  it("should throw BadRequestException if payable has not found", async () => {
    const value = "uuid";
    jest.spyOn(prisma.payable, "findUnique").mockResolvedValue(null);
    const promise = findPayableByIdPipe.transform(value);
    const error = new BadRequestException("payable not found");
    await expect(promise).rejects.toThrow(error);
  });

  it("should return the founded payable when success", async () => {
    const value = "uuid";
    const output = await findPayableByIdPipe.transform(value);
    expect(output).toEqual(payable);
  });
});
