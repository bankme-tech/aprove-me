import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IPayableService } from "@/@core/domain/services/payable.service.interface";
import { PayableService } from "@/@core/application/services/payable.service";
import { AxiosHttpClient } from "../http/axios.http.client";
import { HttpPayableGateway } from "../gateways/http-payable.gateway";
import { IPayableGateway } from "@/@core/domain/gateways/payable.gateway";
import { IAssignorService } from "@/@core/domain/services/assignor.service.interface";
import { AssignorService } from "@/@core/application/services/assignor.service";
import { IAssignorGateway } from "@/@core/domain/gateways/assignor.gateway";
import { HttpAssignorGateway } from "../gateways/http-assignor.gateway";
import { UserService } from "@/@core/application/services/user.service";
import { IUserService } from "@/@core/domain/services/user.service.interface";
import { IUserGateway } from "@/@core/domain/gateways/user.gateway";
import { HttpUserGateway } from "../gateways/http-user.gateway";
import { JwtDecoder } from "../jwt-decoder";
import { IJwtDecoder } from "@/@core/application/interfaces/decoder.interface";
import { DecodedToken } from "@/@core/domain/dtos/user.dto";

export const myContainer = new Container();

myContainer.bind(TYPES.IHttpClient).to(AxiosHttpClient);
myContainer.bind<IPayableGateway>(TYPES.IPayableGateway).to(HttpPayableGateway);
myContainer
  .bind<IAssignorGateway>(TYPES.IAssignorGateway)
  .to(HttpAssignorGateway);
myContainer.bind<IPayableService>(TYPES.IPayableService).to(PayableService);
myContainer.bind<IAssignorService>(TYPES.IAssignorService).to(AssignorService);
myContainer.bind<IUserService>(TYPES.IUserService).to(UserService);
myContainer.bind<IUserGateway>(TYPES.IUserGateway).to(HttpUserGateway);
myContainer.bind<IJwtDecoder<DecodedToken>>(TYPES.JwtDecoder).to(JwtDecoder);
