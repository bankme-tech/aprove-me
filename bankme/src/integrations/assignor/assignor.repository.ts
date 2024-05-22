import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import Assignor from '../entity/Assignor';

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
      assignor.name,
      assignor.email,
      assignor.phone,
    );
  }

  async updateAssignorById(
    id: string,
    assignor: Assignor,
  ): Promise<Assignor | null> {
    const assignorFromDB = await this.findAssignorById(id);

    if (!assignorFromDB) {
      return null;
    }

    const updatedAssignor = await this.prismaService.assignor.update({
      where: {
        id,
      },
      data: assignor.toCreate(),
    });

    return new Assignor(
      updatedAssignor.id,
      updatedAssignor.document,
      updatedAssignor.name,
      updatedAssignor.email,
      updatedAssignor.phone,
    );
  }

  async deleteAssignorById(id: string): Promise<Assignor | null> {
    const assignorFromDB = await this.findAssignorById(id);

    if (!assignorFromDB) {
      return null;
    }

    const deletedAssignor = await this.prismaService.assignor.delete({
      where: {
        id,
      },
    });

    return new Assignor(
      deletedAssignor.id,
      deletedAssignor.document,
      deletedAssignor.name,
      deletedAssignor.email,
      deletedAssignor.phone,
    );
  }
}
