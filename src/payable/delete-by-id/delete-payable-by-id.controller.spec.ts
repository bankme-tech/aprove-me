import { Test } from "@nestjs/testing";
import { Payable } from "@prisma/client";

import { PrismaProvider } from "../../providers/prisma.provider";
import { DeletePayableByIdController } from "./delete-payable-by-id.controller";

const payable: Payable = {
  id: "id",
  value: 10,
  emissionDate: new Date("2024-05-26"),
  assignorId: "assignorId",
};

const deletedPayable: Payable = {
  id: `id ${Math.random()}`,
  value: 10 + Math.random(),
  emissionDate: new Date(),
  assignorId: `assignorId ${Math.random()}`,
};

describe("DeletePayableByIdController", () => {
  let deletePayableByIdController: DeletePayableByIdController;
  let prismaProvider: PrismaProvider;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DeletePayableByIdController],
      providers: [
        {
          provide: PrismaProvider,
          useValue: { payable: { delete: async () => deletedPayable } },
        },
      ],
    }).compile();

    deletePayableByIdController = moduleRef.get(DeletePayableByIdController);
    prismaProvider = moduleRef.get(PrismaProvider);
  });

  it("should be defined", () => {
    expect(deletePayableByIdController).toBeDefined();
  });

  it("should delete payable by id", async () => {
    const expectedArgs: Parameters<PrismaProvider["payable"]["delete"]> = [
      { where: { id: payable.id } },
    ];

    jest.spyOn(prismaProvider.payable, "delete");
    await deletePayableByIdController.handle(payable);
    expect(prismaProvider.payable.delete).toHaveBeenCalledTimes(1);
    expect(prismaProvider.payable.delete).toHaveBeenCalledWith(...expectedArgs);
  });

  it("should return the deleted payable", async () => {
    const output = await deletePayableByIdController.handle(payable);
    expect(output).toEqual(deletedPayable);
  });
});
