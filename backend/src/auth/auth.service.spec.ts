import { Test, TestingModule } from "@nestjs/testing";
import { AuthService, UserRepository } from "./auth.service";  // Use caminho relativo por enquanto
import { SessionModule } from "./session/session-manager.module";  // Use caminho relativo por enquanto
import { AuthGuard } from "./auth.guard";  // Use caminho relativo por enquanto
import { AuthController } from "./auth.controller";  // Use caminho relativo por enquanto
import { SessionManagerService } from "./session/session-manager.service";  // Use caminho relativo por enquanto
import { PrismaService } from "../prisma/prisma.service";  // Use caminho relativo por enquanto
import { HttpException, HttpStatus } from "@nestjs/common";

describe("AuthService", () => {
  let authService: AuthService;
  let mockSessionManager;
  let mockUserRepository;

  const userEmail = "henriquemauler@gmail.com";
  const token = "mockedtoken";
  
  const request = {
    email: userEmail,
    password: "12345",
  };
  

  beforeEach(async () => {
    mockSessionManager = {
      createSession: jest.fn(),
      getSession: jest.fn(),
      removeSession: jest.fn(),
    };

    mockUserRepository = {
      findOneByEmail: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [SessionModule],
      providers: [
        AuthService,
        { provide: UserRepository, useValue: mockUserRepository },
        PrismaService,
        { provide: SessionManagerService, useValue: mockSessionManager },
        AuthGuard,
      ],
      controllers: [AuthController],
    }).compile();

    authService = module.get<AuthService>(AuthService);

    
    // Mock responses
    mockSessionManager.createSession.mockReturnValue(token);

    mockUserRepository.create.mockResolvedValue({
      id: "123",
      email: userEmail,
      password: "hashedpassword",
    });

  });
  
  it("should register a user (that not exists yet)", async () => {
    mockUserRepository.findOneByEmail.mockResolvedValue(null); 

    const response = await authService.register(request.email, request.password);

    expect(response).toEqual({
      id: "123",
      email: userEmail,
      token: token,
    });

    expect(mockUserRepository.findOneByEmail).toHaveBeenCalledWith(userEmail);
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      email: userEmail,
      // password: "hashedpassword", 
      password: expect.any(String), 
    });

    // expect(mockSessionManager.createSession).toHaveBeenCalledWith(expect.objectContaining({
    //   id: "123",
    //   email: userEmail,
    //   password: "hashedpassword",
    // }));
  });
  
  it("should try register a user that already exists", async () => {
    mockUserRepository.findOneByEmail.mockResolvedValue({
      id: "123",
      email: userEmail,
      password: "hashedpassword",
    }); 


    // const response = authService.register(request.email, request.password);

    // Use Jest's rejects.toThrow to check if the correct exception is thrown
    await expect(authService.register(request.email, request.password)).rejects.toThrow(
      new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    );

    // expect(mockUserRepository.findOneByEmail).toHaveBeenCalledWith(userEmail)
    expect(mockUserRepository.findOneByEmail).toHaveBeenCalled()
    expect(mockUserRepository.create).not.toHaveBeenCalled()

  });
});
