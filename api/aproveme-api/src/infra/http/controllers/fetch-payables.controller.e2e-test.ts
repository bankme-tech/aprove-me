import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/prisma/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AssignorFactory } from "test/factories/makeAssignor";
import { PayableFactory } from "test/factories/makePayable";
import { UserFactory } from "test/factories/makeUser";

describe("Fetch Payables (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  let assignorFactory: AssignorFactory;
  let payableFactory: PayableFactory;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PayableFactory, AssignorFactory, UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    assignorFactory = moduleRef.get(AssignorFactory);
    payableFactory = moduleRef.get(PayableFactory);
    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test("[GET] /integrations/payable/", async () => {
    const user = await userFactory.makePrismaUser();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const assignor = await assignorFactory.makePrismaAssignor({
      name: "jane doe",
    });
    await Promise.all([
      payableFactory.makePrismaPayable({
        assignorId: assignor.id,
        value: 123.1,
      }),
      payableFactory.makePrismaPayable({
        assignorId: assignor.id,
        value: 123.2,
      }),
    ]);

    const response = await request(app.getHttpServer())
      .get(`/integrations/payable`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);

    expect(response.body.payables).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          assignorId: assignor.id.toString(),
          value: 123.1,
        }),
        expect.objectContaining({
          assignorId: assignor.id.toString(),
          value: 123.2,
        }),
      ])
    );
  });
});
