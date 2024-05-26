import { BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { Assignor } from "@prisma/client";

import { PrismaProvider } from "../providers/prisma.provider";
import { FindAssignorByIdPipe } from "./find-assignor-by-id.pipe";

type PrismaAssignorFindUnique = PrismaProvider["assignor"]["findUnique"];

const assignor: Assignor = {
  id: "uuid",
  document: "document",
  email: "email",
  phone: "phone",
  name: "name",
};

describe("FindAssignorByIdPipe", () => {
  let findAssignorByIdPipe: FindAssignorByIdPipe;
  let prisma: PrismaProvider;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindAssignorByIdPipe,
        {
          provide: PrismaProvider,
          useValue: { assignor: { findUnique: async () => assignor } },
        },
      ],
    }).compile();

    findAssignorByIdPipe = moduleRef.get(FindAssignorByIdPipe);
    prisma = moduleRef.get(PrismaProvider);
  });

  it("should be defined", async () => {
    expect(findAssignorByIdPipe).toBeDefined();
  });

  it("should find assignor by id", async () => {
    const value = "uuid";

    const expectedArgs: Parameters<PrismaAssignorFindUnique>[0] = {
      where: { id: value },
    };

    const findUniqueSpy = jest.spyOn(prisma.assignor, "findUnique");
    await findAssignorByIdPipe.transform(value);
    expect(findUniqueSpy).toHaveBeenCalledTimes(1);
    expect(findUniqueSpy).toHaveBeenCalledWith(expectedArgs);
  });

  it("should throw BadRequestException if assignor has not found", async () => {
    const value = "uuid";
    jest.spyOn(prisma.assignor, "findUnique").mockResolvedValue(null);
    const promise = findAssignorByIdPipe.transform(value);
    const error = new BadRequestException("assignor not found");
    await expect(promise).rejects.toThrow(error);
  });

  it("should return the founded assignor when success", async () => {
    const value = "uuid";
    const output = await findAssignorByIdPipe.transform(value);
    expect(output).toEqual(assignor);
  });
});
