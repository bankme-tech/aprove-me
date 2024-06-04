import { RegisterUserService } from "./register-user";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { FakeHasher } from "test/cryptography/fake-hasher";

let inMemoryStuentsRepo: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let sut: RegisterUserService;

describe("Register User", () => {
  beforeEach(() => {
    inMemoryStuentsRepo = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();

    sut = new RegisterUserService(inMemoryStuentsRepo, fakeHasher);
  });

  it("should be able to register a new user", async () => {
    const result = await sut.execute({
      login: "aproveme",
      password: "aproveme",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual({
      user: inMemoryStuentsRepo.items[0],
    });
  });

  it("should hash user password upon registration", async () => {
    const result = await sut.execute({
      login: "aproveme",
      password: "aproveme",
    });

    const hashedPassword = await fakeHasher.hash("aproveme");

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryStuentsRepo.items[0].password).toEqual(hashedPassword);
  });
});
