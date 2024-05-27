import "reflect-metadata";
import { Container } from "inversify";
import { IPayableGateway } from "@/@core/domain/gateways/payable.gateway";
import { TYPES } from "./types";
import { LocalStoragePayableGateway } from "../gateways/local-storage-payable.gateway";
import { IPayableService } from "@/@core/domain/services/payable.service.interface";
import { PayableService } from "@/@core/application/services/payable.service";

export const myContainer = new Container();

myContainer
  .bind<IPayableGateway>(TYPES.IPayableGateway)
  .to(LocalStoragePayableGateway);
myContainer.bind<IPayableService>(TYPES.IPayableService).to(PayableService);
