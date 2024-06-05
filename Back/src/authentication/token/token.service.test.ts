import { DateUtils } from "@/shared/utils/date";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { sign } from "jsonwebtoken";
import { UserBasicDto } from "../user/dto/userBasic.dto";
import { TokenService } from "./token.service";

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn()
}));

jest.mock("@/shared/utils/date", () => ({
    DateUtils: {
        today: jest.fn()
    }
}));

describe("TokenService", () => {
    let service: TokenService;
    let configService: ConfigService;

    const mockConfigService = {
        get: jest.fn()
    };

    const user: UserBasicDto = {
        id: "1",
        login: "testuser"
    };

    const now = new Date();
    const quantityMinutesToken = 60;
    const secretToken = "secret";
    const token = "signed_jwt_token";

    const expectedPayload = {
        sub: JSON.stringify(user),
        exp: new Date(now.setMinutes(now.getMinutes() + quantityMinutesToken)).getTime(),
        iat: now.getTime()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TokenService, { provide: ConfigService, useValue: mockConfigService }, Logger]
        }).compile();

        service = module.get<TokenService>(TokenService);
        configService = module.get<ConfigService>(ConfigService);

        mockConfigService.get.mockImplementation((key: string) => {
            if (key === "auth.expirationMinutes") return quantityMinutesToken;
            if (key === "auth.jwtSecret") return secretToken;
        });

        (DateUtils.today as jest.Mock).mockReturnValue(now);
        (sign as jest.Mock).mockReturnValue(token);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("generateAccessToken", () => {
        it("should generate an access token successfully", () => {
            const result = service.generateAccessToken(user);

            expect(result).toEqual(token);
            expect(sign).toHaveBeenCalledWith(expectedPayload, secretToken);
        });
    });
});
