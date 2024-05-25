import { PayableDto } from './DTOs/payable';
import { AssignorDto } from './DTOs/assignor';
import { PayableRepo } from './repositories/payable-repo';
import { AssignorRepo } from './repositories/assignor-repo';
import { UserDto } from './DTOs/user';
import { UserRepo } from './repositories/user-repo';
import { AuthService } from './auth/auth-service';
import { TokenValidator } from './auth/toke';
export declare class AppController {
    private payable;
    private assignor;
    private user;
    private authService;
    private tokenService;
    constructor(payable: PayableRepo, assignor: AssignorRepo, user: UserRepo, authService: AuthService, tokenService: TokenValidator);
    auth(body: UserDto): Promise<{
        token: string;
    }>;
    createUser(body: UserDto): Promise<UserDto>;
    getUserById(id: number, authorization: string): Promise<UserDto>;
    getUserByLogin(login: string): Promise<UserDto>;
    getUserAll(): Promise<UserDto[]>;
    updateUser(id: number, body: UserDto): Promise<UserDto>;
    deleteUser(id: number): Promise<void>;
    createPayable(body: PayableDto): Promise<PayableDto>;
    getPayableById(id: string): Promise<PayableDto>;
    getPayableAll(): Promise<PayableDto[]>;
    updatePayable(id: string, body: PayableDto): Promise<PayableDto>;
    deletePayable(id: string): Promise<any>;
    createAssignor(body: AssignorDto): Promise<AssignorDto>;
    getAssignorById(id: string): Promise<AssignorDto>;
    getAssignorsAll(): Promise<AssignorDto[]>;
    updateAssignor(id: string, body: AssignorDto): Promise<AssignorDto>;
    deleteAssignor(id: string): Promise<any>;
}
