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

describe("Fetch Assignors Names (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  let assignorFactory: AssignorFactory;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AssignorFactory, UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    assignorFactory = moduleRef.get(AssignorFactory);
    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test("[GET] /integrations/assignor/", async () => {
    const user = await userFactory.makePrismaUser();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    await Promise.all([
      assignorFactory.makePrismaAssignor({ name: "jane doe" }),
      assignorFactory.makePrismaAssignor({ name: "john doe" }),
    ]);

    const response = await request(app.getHttpServer())
      .get(`/integrations/assignor`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    console.log(response.body.assignorsNames);
    expect(response.body.assignorsNames).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "jane doe" }),
        expect.objectContaining({ name: "john doe" }),
      ])
    );
  });
});
