import { Assignor } from "../entities/assignor.entity";

export type CreateAssignorInputDTO = Pick<
  Assignor,
  "document" | "email" | "name" | "phone"
>;

export type CreateAssignorOutputDTO = Assignor;

export type FindAssignorInputDTO = Assignor;
