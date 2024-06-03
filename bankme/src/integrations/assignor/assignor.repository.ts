import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import Assignor from '../entity/Assignor';
import { IAssignorValues } from '../types/IAssignor';

@Injectable()
export default class AssignorRepository {
  constructor(private prismaService: PrismaService) {}

  async createAssignorRegister(assignor: Assignor): Promise<Assignor> {
    const assignorFromDB = await this.findAssignorByDocument(assignor.document);

    if (assignorFromDB) {
      return assignorFromDB;
    }

    const createdAssignor = await this.prismaService.assignor.create({
      data: assignor.toCreate(),
    });

    const assignorToReturn = new Assignor();

    assignorToReturn.id = createdAssignor.id;
    assignorToReturn.document = createdAssignor.document;
    assignorToReturn.email = createdAssignor.email;
    assignorToReturn.password = createdAssignor.password;
    assignorToReturn.phone = createdAssignor.phone;
    assignorToReturn.name = createdAssignor.name;
    assignorToReturn.active = createdAssignor.active;

    return assignorToReturn;
  }

  async findAssignorByDocument(document: string): Promise<Assignor | null> {
    const assignor = await this.prismaService.assignor.findFirst({
      where: {
        document,
      },
    });

    if (!assignor) {
      return null;
    }

    const assignorToReturn = new Assignor();

    assignorToReturn.id = assignor.id;
    assignorToReturn.document = assignor.document;
    assignorToReturn.email = assignor.email;
    assignorToReturn.password = assignor.password;
    assignorToReturn.phone = assignor.phone;
    assignorToReturn.name = assignor.name;
    assignorToReturn.active = assignor.active;

    return assignorToReturn;
  }

  async findAssignorById(id: string): Promise<Assignor | null> {
    const assignor = await this.prismaService.assignor.findUnique({
      where: {
        id,
      },
    });

    if (!assignor) {
      return null;
    }

    const assignorToReturn = new Assignor();

    assignorToReturn.id = assignor.id;
    assignorToReturn.document = assignor.document;
    assignorToReturn.email = assignor.email;
    assignorToReturn.password = assignor.password;
    assignorToReturn.phone = assignor.phone;
    assignorToReturn.name = assignor.name;
    assignorToReturn.active = assignor.active;

    return assignorToReturn;
  }

  async updateAssignorById(
    id: string,
    assignor: Partial<IAssignorValues>,
  ): Promise<Assignor | null> {
    const assignorFromDB = await this.findAssignorById(id);

    if (!assignorFromDB) {
      return null;
    }

    const updatedAssignor = await this.prismaService.assignor.update({
      where: {
        id,
      },
      data: assignor,
    });

    const assignorToReturn = new Assignor();

    assignorToReturn.id = updatedAssignor.id;
    assignorToReturn.document = updatedAssignor.document;
    assignorToReturn.email = updatedAssignor.email;
    assignorToReturn.password = updatedAssignor.password;
    assignorToReturn.phone = updatedAssignor.phone;
    assignorToReturn.name = updatedAssignor.name;
    assignorToReturn.active = updatedAssignor.active;

    return assignorToReturn;
  }

  async deleteAssignorById(
    id: string,
    assignor: Partial<IAssignorValues>,
  ): Promise<Assignor | null> {
    const assignorFromDB = await this.findAssignorById(id);

    if (!assignorFromDB) {
      return null;
    }

    const deletedAssignor = await this.prismaService.assignor.update({
      where: {
        id,
      },
      data: assignor,
    });

    const assignorToReturn = new Assignor();

    assignorToReturn.id = deletedAssignor.id;
    assignorToReturn.document = deletedAssignor.document;
    assignorToReturn.email = deletedAssignor.email;
    assignorToReturn.password = deletedAssignor.password;
    assignorToReturn.phone = deletedAssignor.phone;
    assignorToReturn.name = deletedAssignor.name;
    assignorToReturn.active = deletedAssignor.active;

    return assignorToReturn;
  }

  async findAssignorByEmail(email: string): Promise<Assignor | null> {
    const user = await this.prismaService.assignor.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const assignorToReturn = new Assignor();

    assignorToReturn.id = user.id;
    assignorToReturn.document = user.document;
    assignorToReturn.email = user.email;
    assignorToReturn.password = user.password;
    assignorToReturn.phone = user.phone;
    assignorToReturn.name = user.name;
    assignorToReturn.active = user.active;

    return assignorToReturn;
  }
}
