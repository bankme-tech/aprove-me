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

    return new Assignor(
      createdAssignor.id,
      createdAssignor.document,
      createdAssignor.name,
      createdAssignor.email,
      createdAssignor.password,
      createdAssignor.phone,
    );
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

    return new Assignor(
      assignor.id,
      assignor.document,
      assignor.name,
      assignor.email,
      assignor.password,
      assignor.phone,
    );
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

    return new Assignor(
      assignor.id,
      assignor.document,
      assignor.email,
      assignor.password,
      assignor.phone,
      assignor.name,
    );
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

    return assignorToReturn;
  }

  async findUserByEmail(email: string): Promise<Assignor | null> {
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

    return assignorToReturn;
  }
}
