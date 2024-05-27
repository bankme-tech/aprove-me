import { BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Assignor } from "@prisma/client";

import { PrismaProvider } from "../../providers/prisma.provider";
import { DeleteAssignorByIdController } from "./delete-assignor-by-id.controller";

describe("DeleteAssignorByIdController", () => {
  let deleteAssignorByIdController: DeleteAssignorByIdController;
  let prismaProvider: PrismaProvider;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DeleteAssignorByIdController],
      providers: [
        {
          provide: PrismaProvider,
          useValue: {
            assignor: {
              delete: async () => ({}),
            },
            payable: {
              count: async () => 0,
            },
          },
        },
      ],
    }).compile();

    deleteAssignorByIdController = moduleRef.get(DeleteAssignorByIdController);
    prismaProvider = moduleRef.get(PrismaProvider);
  });

  it("should be defined", () => {
    expect(deleteAssignorByIdController).toBeDefined();
  });

  it("should throw BadRequestException if assignor have payables", async () => {
    const assignor: Assignor = {
      id: "uuid",
      document: "document",
      email: "email",
      phone: "phone",
      name: "name",
    };

    jest.spyOn(prismaProvider.payable, "count").mockResolvedValue(1);
    const promise = deleteAssignorByIdController.handle(assignor);
    const message = `you can only delete assignor if you delete all payables first`;
    const error = new BadRequestException(message);
    await expect(promise).rejects.toThrow(error);
  });

  it("should delete assignor by id", async () => {
    const assignor: Assignor = {
      id: "uuid",
      document: "document",
      email: "email",
      phone: "phone",
      name: "name",
    };

    const expectedArgs: Parameters<PrismaProvider["assignor"]["delete"]>[0] = {
      where: {
        id: assignor.id,
      },
    };

    jest.spyOn(prismaProvider.assignor, "delete");
    await deleteAssignorByIdController.handle(assignor);
    expect(prismaProvider.assignor.delete).toHaveBeenCalledTimes(1);
    expect(prismaProvider.assignor.delete).toHaveBeenCalledWith(expectedArgs);
  });

  it("should return the deleted assignor", async () => {
    const assignor: Assignor = {
      id: "uuid",
      document: "document",
      email: "email",
      phone: "phone",
      name: "name",
    };

    jest.spyOn(prismaProvider.assignor, "delete").mockResolvedValue(assignor);
    const output = await deleteAssignorByIdController.handle(assignor);
    expect(output).toEqual(assignor);
  });
});
