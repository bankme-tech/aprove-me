import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { AuthenticateUserService } from "./authenticate-user";
import { makeUser } from "test/factories/makeUser";

let inMemoryStuentsRepo: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateUserService;

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryStuentsRepo = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();

    sut = new AuthenticateUserService(
      inMemoryStuentsRepo,
      fakeHasher,
      fakeEncrypter
    );
  });

  it("should be able to authenticate a user", async () => {
    const user = makeUser({
      login: "aproveme",
      password: await fakeHasher.hash("aproveme"),
    });

    inMemoryStuentsRepo.create(user);

    const result = await sut.execute({
      login: "aproveme",
      password: "aproveme",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
});
