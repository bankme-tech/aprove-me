import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/prisma/database.module";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { CreateAssignorService } from "@/domain/receivables/application/services/create-assignor-service";
import { CreatePayableService } from "@/domain/receivables/application/services/create-payable-service";
import { EditAssignorService } from "@/domain/receivables/application/services/edit-assignor-service";
import { EditPayableService } from "@/domain/receivables/application/services/edit-payable-service";
import { FindPayableByIdService } from "@/domain/receivables/application/services/find-payable-by-id";
import { RemoveAssignorService } from "@/domain/receivables/application/services/remove-assignor-service";
import { RemovePayableService } from "@/domain/receivables/application/services/remove-payable-service";
import { RegisterUserService } from "@/domain/account/application/services/register-user";
import { AuthenticateUserService } from "@/domain/account/application/services/authenticate-user";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [],
  providers: [
    //Account Services
    RegisterUserService,
    AuthenticateUserService,

    //Assignor Services
    CreateAssignorService,
    EditAssignorService,
    RemoveAssignorService,

    //Payable Services
    CreatePayableService,
    EditPayableService,
    FindPayableByIdService,
    RemovePayableService,
  ],
})
export class HttpModule {}
