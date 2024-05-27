import { Test } from "@nestjs/testing";
import { Assignor } from "@prisma/client";

import { PrismaProvider } from "../../providers/prisma.provider";
import { FindAssignorByIdController } from "./find-assignor-by-id.controller";

describe("FindAssignorByIdController", () => {
  let findAssignorByIdController: FindAssignorByIdController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FindAssignorByIdController],
      providers: [
        {
          provide: PrismaProvider,
          useValue: { assignor: { findUnique: jest.fn() } },
        },
      ],
    }).compile();

    findAssignorByIdController = moduleRef.get(FindAssignorByIdController);
  });

  it("should be defined", () => {
    expect(findAssignorByIdController).toBeDefined();
  });

  it("should return the founded assignor by id", async () => {
    const assignor: Assignor = {
      id: "uuid",
      document: "document",
      email: "email",
      phone: "phone",
      name: "name",
    };

    const output = await findAssignorByIdController.handle(assignor);
    expect(output).toEqual(assignor);
  });
});
