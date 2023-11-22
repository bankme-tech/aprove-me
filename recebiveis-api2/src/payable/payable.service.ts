import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { CreateAssignorDto } from '../assignor/dto/create-assignor.dto';
import { CreatePayableDto } from './dto/create-payable.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UUID } from 'crypto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Injectable()
export class PayableService {
  private readonly logger = new Logger(PayableService.name);
  constructor(private prisma: PrismaService) {}

  async create(
    createPayableDto: CreatePayableDto,
    createAssignorDto: CreateAssignorDto,
  ) {
    Logger.debug('Creating payable');
    try {
      let existingAssignor = await this.prisma.assignor.findUnique({
        where: { document: createAssignorDto.document },
      });

      if (!existingAssignor) {
        Logger.debug(`creatint assignor with ${createAssignorDto.document}`);
        existingAssignor = await this.prisma.assignor.create({
          data: createAssignorDto,
        });
      }
      const { emissionDate, value } = createPayableDto;
      const createdPayable = await this.prisma.payable.create({
        data: {
          emissionDate,
          value,
          assignor: {
            connect: { document: existingAssignor.document },
          },
        },
      });

      return { createdPayable };
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.prisma.payable.findMany();
  }

  async findOne(id: UUID) {
    this.logger.debug(`This action returns a #${id} payable`);
    return await this.prisma.payable.findUnique({
      where: { id },
    });
  }

  async update(id: UUID, updatePayable: UpdatePayableDto) {
    this.logger.debug(`This action will update a payable by id #${id}`);
    try {
      return await this.prisma.payable.update({
        where: { id },
        data: updatePayable,
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException('entity not found');
    }
  }

  async remove(id: UUID) {
    this.logger.debug(`This action removes a #${id} payable`);
    return await this.prisma.payable.delete({
      where: { id },
    });
  }
}
