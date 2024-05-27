import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IPayableService } from "@/@core/domain/services/payable.service.interface";
import { PayableService } from "@/@core/application/services/payable.service";
import { AxiosHttpClient } from "../http/axios.http.client";
import { IPayableGateway } from "@/@core/domain/gateways/payable.gateway";
import { IAssignorService } from "@/@core/domain/services/assignor.service.interface";
import { AssignorService } from "@/@core/application/services/assignor.service";
import { IAssignorGateway } from "@/@core/domain/gateways/assignor.gateway";
import { HttpAssignorGateway } from "../gateways/http-assignor.gateway";

export const myContainer = new Container();

myContainer.bind(TYPES.IHttpClient).to(AxiosHttpClient);
myContainer
  .bind<IAssignorGateway>(TYPES.IAssignorGateway)
  .to(HttpAssignorGateway);
myContainer.bind<IPayableService>(TYPES.IPayableService).to(PayableService);
myContainer.bind<IAssignorService>(TYPES.IAssignorService).to(AssignorService);
