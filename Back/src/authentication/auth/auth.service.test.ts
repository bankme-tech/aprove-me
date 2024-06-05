import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TokenService } from "../token/token.service";
import { UserDto } from "../user/dto/user.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { CredentialDto } from "./dto/credential.dto";
import { LoginResponseDto } from "./dto/loginResponse.dto";

describe("AuthService", () => {
    let service: AuthService;
    let tokenService: TokenService;
    let userService: UserService;

    const mockTokenService = {
        generateAccessToken: jest.fn()
    };

    const mockUserService = {
        validateCredential: jest.fn()
    };

    const credential: CredentialDto = {
        login: "testuser",
        password: "password123"
    };
    const user: UserDto = {
        id: "1",
        login: "testuser",
        password: "password123"
    };
    const accessToken = "access_token";
    const loginResponse: LoginResponseDto = {
        user,
        accessToken
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: TokenService, useValue: mockTokenService },
                { provide: UserService, useValue: mockUserService },
                Logger
            ]
        }).compile();

        service = module.get<AuthService>(AuthService);
        tokenService = module.get<TokenService>(TokenService);
        userService = module.get<UserService>(UserService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("login", () => {
        it("should login successfully", async () => {
            mockUserService.validateCredential.mockResolvedValue(user);
            mockTokenService.generateAccessToken.mockReturnValue(accessToken);

            await expect(service.login(credential)).resolves.toEqual(loginResponse);
            expect(mockUserService.validateCredential).toHaveBeenCalledWith(credential);
            expect(mockTokenService.generateAccessToken).toHaveBeenCalledWith(user);
        });
    });
});
