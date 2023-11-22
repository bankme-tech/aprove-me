import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AssignorService {
  private readonly logger = new Logger(AssignorService.name);
  constructor(private prisma: PrismaService) {}

  async create(createAssignorDto: CreateAssignorDto) {
    try {
      this.logger.debug('This action adds a new assignor', createAssignorDto);
      return await this.prisma.assignor.create({
        data: createAssignorDto,
      });
    } catch (error) {
      this.logger.error('Error creating assignor');
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const uniqueFields = (error.meta?.target as string[]) ?? [];
        const errorMessage = `The following fields are already in use { ${uniqueFields
          .map((field) => `${field}: ${createAssignorDto[field]} `)
          .join(', ')} }`;
        this.logger.error(errorMessage);
        throw new ConflictException(errorMessage);
      }
      throw error;
    }
  }

  findAll() {
    this.logger.debug(`This action returns all assignor`);
    return this.prisma.assignor.findMany();
  }

  findOne(id: UUID) {
    this.logger.debug(`This action returns a #${id} assignor`);
    return this.prisma.assignor.findUnique({
      where: { id },
    });
  }

  update(id: UUID, updateAssignorDto: UpdateAssignorDto) {
    this.logger.debug(`This action will update a assignor by id #${id}`);
    return this.prisma.assignor.update({
      where: { id },
      data: updateAssignorDto,
    });
  }

  remove(id: UUID) {
    this.logger.debug(`This action removes a #${id} assignor`);
    return this.prisma.assignor.delete({
      where: { id },
    });
  }
}
