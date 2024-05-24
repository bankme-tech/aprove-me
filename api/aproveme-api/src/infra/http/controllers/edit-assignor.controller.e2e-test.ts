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

describe("Edit Assignor (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  let assignorFactory: AssignorFactory;
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
    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test("[PUT] /integrations/assignor/:id", async () => {
    const user = await userFactory.makePrismaUser();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const assignor = await assignorFactory.makePrismaAssignor();

    const response = await request(app.getHttpServer())
      .put(`/integrations/assignor/${assignor.id.toString()}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        document: null,
        email: "janedoe@mail.com",
        name: null,
        phone: null,
      });

    expect(response.statusCode).toBe(204);
    const prismaAssignor = await prisma.assignor.findUnique({
      where: {
        id: assignor.id.toString(),
      },
    });
    expect(prismaAssignor).toEqual(
      expect.objectContaining({
        id: assignor.id.toString(),
        document: assignor.document,
        email: "janedoe@mail.com",
        phone: assignor.phone,
        name: assignor.name,
      })
    );
  });
});
