import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { Payable } from "@prisma/client";

import { PrismaProvider } from "../../providers/prisma.provider";
import { FindPayableByIdController } from "./find-payable-by-id.controller";

describe("FindPayableByIdController", () => {
  let findPayableByIdController: FindPayableByIdController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          load: [() => ({ SECRET: "secret" })],
        }),
      ],
      controllers: [FindPayableByIdController],
      providers: [
        {
          provide: PrismaProvider,
          useValue: { payable: { findUnique: jest.fn() } },
        },
      ],
    }).compile();

    findPayableByIdController = moduleRef.get(FindPayableByIdController);
  });

  it("should be defined", () => {
    expect(findPayableByIdController).toBeDefined();
  });

  it("should return the founded payable by id", async () => {
    const payable: Payable = {
      id: "id",
      value: 10,
      emissionDate: new Date("2024-05-26"),
      assignorId: "assignorId",
    };

    const output = await findPayableByIdController.handle(payable);
    expect(output).toEqual(payable);
  });
});
