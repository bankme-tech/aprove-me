import { AppModule } from "@/infra/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { hash } from "bcryptjs";
import { UserFactory } from "test/factories/makeUser";
import request from "supertest";
import { DatabaseModule } from "@/infra/database/prisma/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";

describe("Authenticate (E2E)", () => {
  let app: INestApplication;
  let userFactory: UserFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test("[POST] /integrations/sessions", async () => {
    await userFactory.makePrismaUser({
      login: "aproveme",
      password: await hash("aproveme", 8),
    });

    const response = await request(app.getHttpServer())
      .post("/integrations/sessions")
      .send({
        login: "aproveme",
        password: "aproveme",
      });

    expect(response.statusCode).toBe(201);

    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
