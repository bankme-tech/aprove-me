import { UniqueEntityId } from "@/core/entities/unique-entity-id";
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

describe("Get Payable By Id (E2E)", () => {
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

  test("[GET] /integrations/payable/:id", async () => {
    const user = await prisma.assignor.findFirst();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const payable = await prisma.payable.findFirst();

    const response = await request(app.getHttpServer())
      .get(`/integrations/payable/${payable.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      payable: expect.objectContaining({
        value: payable.value,
        emissionDate: payable.emissionDate.toISOString(),
        assignorId: payable.assignorId,
      }),
    });
  });
});
