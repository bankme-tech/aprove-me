import { Test } from "@nestjs/testing";
import type { Assignor } from "@prisma/client";

import { PrismaProvider } from "../../providers/prisma.provider";
import { UpsertAssignorInputDTO } from "../upsert-assignor-input.dto";
import { UpdateAssignorByIdController } from "./update-assignor-by-id.controller";

type PrismaAssignorUpdate = PrismaProvider["assignor"]["update"];

const assignor: Assignor = {
  id: "uuid",
  document: "document",
  email: "email",
  phone: "phone",
  name: "name",
};

const updatedAssignor: Awaited<ReturnType<PrismaAssignorUpdate>> = {
  id: `updated uuid ${Math.random()}`,
  document: `updated document ${Math.random()}`,
  email: `updated email ${Math.random()}`,
  phone: `updated phone ${Math.random()}`,
  name: `updated name ${Math.random()}`,
};

describe("UpdateAssignorByIdController", () => {
  let updateAssignorByIdController: UpdateAssignorByIdController;
  let prisma: PrismaProvider;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UpdateAssignorByIdController],
      providers: [
        {
          provide: PrismaProvider,
          useValue: {
            assignor: {
              findUnique: jest.fn(),
              update: jest.fn(async () => updatedAssignor),
            },
          },
        },
      ],
    }).compile();

    updateAssignorByIdController = moduleRef.get(UpdateAssignorByIdController);
    prisma = moduleRef.get(PrismaProvider);
  });

  it("should be defined", () => {
    expect(updateAssignorByIdController).toBeDefined();
  });

  it("should call update with correct parameters", async () => {
    const input: UpsertAssignorInputDTO = {
      document: `document ${Math.random()}`,
      email: `email ${Math.random()}`,
      phone: `phone ${Math.random()}`,
      name: `name ${Math.random()}`,
    };

    const expectedArgs: Parameters<PrismaAssignorUpdate>[0] = {
      data: {
        document: input.document,
        email: input.email,
        phone: input.phone,
        name: input.name,
      },
      where: {
        id: assignor.id,
      },
    };

    await updateAssignorByIdController.handle(assignor, input);
    expect(prisma.assignor.update).toHaveBeenCalledTimes(1);
    expect(prisma.assignor.update).toHaveBeenCalledWith(expectedArgs);
  });

  it("should return the updated assignor", async () => {
    const input: UpsertAssignorInputDTO = {
      document: `document ${Math.random()}`,
      email: `email ${Math.random()}`,
      phone: `phone ${Math.random()}`,
      name: `name ${Math.random()}`,
    };

    const output = await updateAssignorByIdController.handle(assignor, input);
    expect(output).toEqual(updatedAssignor);
  });
});
