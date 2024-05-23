import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { CreatePayableAssignorDto } from "src/dto-assignor-payable/create-payable-assignor.dto";
import { prisma } from "../prisma/prisma.client";
import { UpdatePayableDto } from "./dto/update-payable.dto";

@Injectable()
export class PayableService {
  async create(
    createPayableAssignorDto: CreatePayableAssignorDto,
    userId: string
  ) {
    const { value, emissionDate, document, email, phone, name } =
      createPayableAssignorDto;
   
    try {
      if (typeof value !== "number" || isNaN(value)) {
        throw new BadRequestException(
          "O valor do recebível deve ser um número válido."
        );
      }

      const assignor = await this.createAssignor(
        document,
        email,
        phone,
        name,
        userId
      );

      const payable = await prisma.payable.create({
        data: {
          value,
          emissionDate,
          assignor: {
            connect: { id: assignor.id },
          },
        },
      });

      const assignorData = await prisma.assignor.findUnique({
        where: { id: assignor.id },
      });

      return { payable, assignor: assignorData };
    } catch (error) {
     
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new BadRequestException("Ocorreu um erro ao criar o recebível.");
    }
  }

  async createAssignor(
    document: string,
    email: string,
    phone: string,
    name: string,
    userId: string
  ) {
    const assignor = await prisma.assignor.create({
      data: {
        document,
        email,
        phone,
        name,
        user: {
          connect: { id: userId },
        },
      },
    });

    return assignor;
  }

  async findOne(id: string, userId: string) {
    const payable = await prisma.payable.findUnique({
      where: { id },
      include: {
        assignor: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!payable || payable.assignor.userId !== userId) {
      throw new NotFoundException("Recebível não encontrado.");
    }
    return payable;
  }

  async deletePayable(id: string, userId: string) {
    const payable = await prisma.payable.delete({
      where: { id },
      include: {
        assignor: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!payable || payable.assignor.userId !== userId) {
      throw new NotFoundException("Recebível não encontrado.");
    }

    return { message: "Recebível apagado com sucesso." };
  }

  async updatePayable(id: string, updatePayableDto: UpdatePayableDto, userId: string) {
    try {
      const payable = await prisma.payable.update({
        where: { id },
        include: {
          assignor: {
            select: {
              userId: true,
            },
          },
        },
        data: updatePayableDto,
      });
      if (!payable || payable.assignor.userId !== userId) {
        throw new NotFoundException("Recebível não encontrado.");
      }

      return payable;
    } catch (error) {
      throw new NotFoundException("Recebível não encontrado.");
    }
  }
}
