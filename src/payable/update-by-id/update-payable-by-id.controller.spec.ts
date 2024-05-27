import { BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Assignor, Payable } from "@prisma/client";

import { PrismaProvider } from "../../providers/prisma.provider";
import { UpdatePayableByIdController } from "./update-payable-by-id.controller";
import { UpdatePayableByIdInputDTO } from "./update-payable-by-id-input.dto";

const payable: Payable = {
  id: "id",
  value: 10,
  emissionDate: new Date("2024-05-26"),
  assignorId: "assignorId",
};

const updatedPayable: Payable = {
  id: `id ${Math.random()}`,
  value: 10 + Math.random(),
  emissionDate: new Date(),
  assignorId: `assignorId ${Math.random()}`,
};

const assignor: Assignor = {
  id: "uuid",
  document: "document",
  email: "email",
  phone: "phone",
  name: "name",
};

describe("UpdatePayableByIdController", () => {
  let updatePayableByIdController: UpdatePayableByIdController;
  let prisma: PrismaProvider;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UpdatePayableByIdController],
      providers: [
        {
          provide: PrismaProvider,
          useValue: {
            assignor: { findUnique: async () => assignor },
            payable: { update: async () => updatedPayable },
          },
        },
      ],
    }).compile();

    updatePayableByIdController = moduleRef.get(UpdatePayableByIdController);
    prisma = moduleRef.get(PrismaProvider);
  });

  it("should be defined", () => {
    expect(updatePayableByIdController).toBeDefined();
  });

  it("should find payable by id if assignor needs to be updated", async () => {
    const input: UpdatePayableByIdInputDTO = {
      value: 10 + Math.random(),
      emissionDate: new Date(),
      assignorId: `assignorId ${Math.random()}`,
    };

    const expectedArgs: Parameters<PrismaProvider["assignor"]["findUnique"]> = [
      { where: { id: input.assignorId } },
    ];

    const findUniqueSpy = jest.spyOn(prisma.assignor, "findUnique");
    await updatePayableByIdController.handle(payable, input);
    expect(findUniqueSpy).toHaveBeenCalledTimes(1);
    expect(findUniqueSpy).toHaveBeenCalledWith(...expectedArgs);
  });

  it("should throw BadRequestException if the new assignor has not found", async () => {
    const input: UpdatePayableByIdInputDTO = {
      value: 10 + Math.random(),
      emissionDate: new Date(),
      assignorId: `assignorId ${Math.random()}`,
    };

    jest.spyOn(prisma.assignor, "findUnique").mockResolvedValue(null);
    const promise = updatePayableByIdController.handle(payable, input);
    const error = new BadRequestException("assignor not found");
    await expect(promise).rejects.toThrow(error);
  });

  it("should call update with correct parameters", async () => {
    const input: UpdatePayableByIdInputDTO = {
      value: 10 + Math.random(),
      emissionDate: new Date(),
      assignorId: `assignorId ${Math.random()}`,
    };

    const expectedArgs: Parameters<PrismaProvider["payable"]["update"]> = [
      {
        data: {
          value: input.value,
          emissionDate: input.emissionDate,
          assignorId: input.assignorId,
        },
        where: {
          id: payable.id,
        },
      },
    ];

    const updateSpy = jest.spyOn(prisma.payable, "update");
    await updatePayableByIdController.handle(payable, input);
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith(...expectedArgs);
  });

  it("should return the updated payable", async () => {
    const input: UpdatePayableByIdInputDTO = {
      value: 10 + Math.random(),
      emissionDate: new Date(),
      assignorId: `assignorId ${Math.random()}`,
    };

    const output = await updatePayableByIdController.handle(payable, input);
    expect(output).toEqual(updatedPayable);
  });
});
