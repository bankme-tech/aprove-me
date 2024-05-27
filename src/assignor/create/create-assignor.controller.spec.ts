import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";

import { PrismaProvider } from "../../providers/prisma.provider";
import { UpsertAssignorInputDTO } from "../upsert-assignor-input.dto";
import { CreateAssignorController } from "./create-assignor.controller";

type PrismaCreateAssignor = PrismaProvider["assignor"]["create"];
type PrismaCreateAssignorInput = Parameters<PrismaCreateAssignor>[0];
type PrismaCreateAssignorOutput = Awaited<ReturnType<PrismaCreateAssignor>>;

const makePrismaProvider = () => ({
  assignor: {
    create: async (
      input: PrismaCreateAssignorInput,
    ): Promise<PrismaCreateAssignorOutput> => ({
      id: input.data.id ?? "uuid",
      document: input.data.document,
      email: input.data.email,
      phone: input.data.phone,
      name: input.data.name,
    }),
  },
});

describe("CreateAssignorController", () => {
  let createAssignorController: CreateAssignorController;
  let prismaProvider: ReturnType<typeof makePrismaProvider>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          load: [() => ({ SECRET: "secret" })],
        }),
      ],
      controllers: [CreateAssignorController],
      providers: [{ provide: PrismaProvider, useValue: makePrismaProvider() }],
    }).compile();

    createAssignorController = moduleRef.get(CreateAssignorController);
    prismaProvider = moduleRef.get(PrismaProvider);
  });

  it("should be defined", () => {
    expect(createAssignorController).toBeDefined();
  });

  it("should create an assignor with correct data", async () => {
    const input: UpsertAssignorInputDTO = {
      document: "document",
      email: "email",
      phone: "phone",
      name: "name",
    };

    const expectedArgs: PrismaCreateAssignorInput = {
      data: {
        document: input.document,
        email: input.email,
        phone: input.phone,
        name: input.name,
      },
    };

    jest.spyOn(prismaProvider.assignor, "create");
    await createAssignorController.handle(input);
    expect(prismaProvider.assignor.create).toHaveBeenCalledTimes(1);
    expect(prismaProvider.assignor.create).toHaveBeenCalledWith(expectedArgs);
  });

  it("should return the created assignor", async () => {
    const input: UpsertAssignorInputDTO = {
      document: "document",
      email: "email",
      phone: "phone",
      name: "name",
    };

    type CreateAssignorHandler = CreateAssignorController["handle"];
    type CreateAssignorOutput = Awaited<ReturnType<CreateAssignorHandler>>;

    const expectedOutput: CreateAssignorOutput = {
      id: "uuid",
      document: input.document,
      email: input.email,
      phone: input.phone,
      name: input.name,
    };

    const output = await createAssignorController.handle(input);
    expect(output).toEqual(expectedOutput);
  });
});
