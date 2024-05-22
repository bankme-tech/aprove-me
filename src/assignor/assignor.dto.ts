import type { Assignor } from "@prisma/client";

export class AssignorDTO {
  readonly id: string;
  readonly document: string;
  readonly email: string;
  readonly phone: string;
  readonly name: string;

  constructor(assignor: Assignor) {
    this.id = assignor.id;
    this.document = assignor.document;
    this.email = assignor.email;
    this.phone = assignor.phone;
    this.name = assignor.name;
  }
}
