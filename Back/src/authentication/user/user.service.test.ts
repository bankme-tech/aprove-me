import { HashUtils } from "@/shared/utils/hash";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { UserBasicDto } from "./dto/userBasic.dto";
import { UserCreateDto } from "./dto/userCreate.dto";
import { UserException } from "./exception/userException.enum";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

jest.mock("@/shared/utils/hash", () => ({
    HashUtils: {
        hash: jest.fn(),
        compare: jest.fn()
    }
}));

describe("UserService", () => {
    let service: UserService;
    let repository: UserRepository;

    const mockRepository = {
        hasLogin: jest.fn(),
        create: jest.fn(),
        findByLogin: jest.fn()
    };

    const loginUser: UserCreateDto = {
        login: "testuser",
        password: "password123"
    };
    const searchedUser: UserCreateDto = {
        login: "testuser",
        password: "password123"
    };
    const user: UserBasicDto = {
        id: "1",
        login: "testuser"
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, { provide: UserRepository, useValue: mockRepository }, Logger]
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<UserRepository>(UserRepository);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("save", () => {
        it("should save a user successfully", async () => {
            mockRepository.hasLogin.mockResolvedValue(false);
            (HashUtils.hash as jest.Mock).mockResolvedValue("hashedpassword123");
            mockRepository.create.mockResolvedValue(undefined);

            await expect(service.save(loginUser)).resolves.not.toThrow();
            expect(mockRepository.hasLogin).toHaveBeenCalledWith(loginUser.login);
            expect(HashUtils.hash).toHaveBeenCalledWith(loginUser.password);
            expect(mockRepository.create).toHaveBeenCalledWith({ ...loginUser, password: "hashedpassword123" });
        });

        it("should throw an exception if email already exists", async () => {
            mockRepository.hasLogin.mockResolvedValue(true);

            await expect(service.save(loginUser)).rejects.toThrow(
                new HttpException(UserException.EMAIL_ALREADY_EXIST, HttpStatus.CONFLICT)
            );
        });
    });

    describe("validateCredential", () => {
        it("should validate user credentials successfully", async () => {
            mockRepository.findByLogin.mockResolvedValue(searchedUser);
            (HashUtils.compare as jest.Mock).mockResolvedValue(true);

            await expect(service.validateCredential(loginUser)).resolves.toEqual(searchedUser);
            expect(mockRepository.findByLogin).toHaveBeenCalledWith(loginUser.login);
            expect(HashUtils.compare).toHaveBeenCalledWith(loginUser.password, searchedUser.password);
        });

        it("should throw an exception if user not found", async () => {
            mockRepository.findByLogin.mockResolvedValue(null);

            await expect(service.validateCredential(loginUser)).rejects.toThrow(
                new HttpException(UserException.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED)
            );
        });

        it("should throw an exception if password does not match", async () => {
            mockRepository.findByLogin.mockResolvedValue(user);
            (HashUtils.compare as jest.Mock).mockResolvedValue(false);

            await expect(service.validateCredential(loginUser)).rejects.toThrow(
                new HttpException(UserException.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED)
            );
        });
    });
});
