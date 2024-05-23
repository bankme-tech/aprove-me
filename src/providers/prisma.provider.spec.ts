import { Test } from "@nestjs/testing";
import { PrismaClient } from "@prisma/client";

import { PrismaProvider } from "./prisma.provider";

describe("PrismaProvider", () => {
  let prismaProvider: PrismaProvider;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaProvider],
    }).compile();

    prismaProvider = moduleRef.get(PrismaProvider);
  });

  it("should be defined", () => {
    expect(prismaProvider).toBeDefined();
  });

  it("should be instance of PrismaClient", () => {
    expect(prismaProvider).toBeInstanceOf(PrismaClient);
  });
});
