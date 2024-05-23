import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/prisma/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AssignorFactory } from "test/factories/makeAssignor";
import { UserFactory } from "test/factories/makeUser";

describe("Receive Payable and Assignor (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  let assignorFactory: AssignorFactory;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, AssignorFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    assignorFactory = moduleRef.get(AssignorFactory);
    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test("[POST] /integrations/payable", async () => {
    const user = await userFactory.makePrismaUser();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const assignor = await assignorFactory.makePrismaAssignor({
      userId: user.id,
    });

    const response = await request(app.getHttpServer())
      .post("/integrations/payable")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        value: 15.55,
        emissionDate: "2024-05-22T12:47:20.560Z",
        assignorId: assignor.id.toString(),
      });

    expect(response.statusCode).toBe(200);

    const payableOnDatabase = await prisma.payable.findFirst({
      where: {
        emissionDate: "2024-05-22T12:47:20.560Z",
      },
    });

    expect(payableOnDatabase).toBeTruthy();
  });
});
