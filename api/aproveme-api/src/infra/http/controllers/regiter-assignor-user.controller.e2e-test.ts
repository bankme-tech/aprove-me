import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Register Assignor User (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test("[POST] /integrations/auth", async () => {
    const response = await request(app.getHttpServer())
      .post("/integrations/auth")
      .send({
        user: {
          login: "jane.doe",
          password: "jane123",
        },
        assignor: {
          document: "01114569874",
          email: "janedoe@mail.com",
          name: "Jane Doe",
          phone: "31998594864",
        },
      });

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        login: "jane.doe",
      },
    });

    const assignorOnDatabase = await prisma.assignor.findUnique({
      where: {
        document: "01114569874",
      },
    });

    expect(userOnDatabase).toBeTruthy();
    expect(assignorOnDatabase).toBeTruthy();
  });
});
