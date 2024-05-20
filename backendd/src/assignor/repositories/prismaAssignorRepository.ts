import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAssignorDto } from '../dto/create-assignor.dto';
import { Assignor } from '../entities/assignor.entity';
import AssignorRepository from './assignorRepository';
import { UpdateAssignorDto } from '../dto/update-assignor.dto';

@Injectable()
export default class PrismaAssignorRepository extends AssignorRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(createAssignorDto: CreateAssignorDto): Promise<Assignor> {
    const { document, name, email, phone } = createAssignorDto;

    const assignorExists = await this.prisma.assignor.findFirst({
      where: {
        document,
      },
    });

    if (assignorExists) {
      throw new ConflictException('Assignor already registered');
    }

    return this.prisma.assignor.create({
      data: {
        document,
        name,
        email,
        phone,
      },
    });
  }

  async findOne(id: string): Promise<Assignor> {
    return this.prisma.assignor.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Assignor[]> {
    return this.prisma.assignor.findMany();
  }

  async update(
    id: string,
    updateAssignorDto: UpdateAssignorDto,
  ): Promise<Assignor> {
    const assignorExists = await this.findOne(id);
    if (assignorExists.document !== updateAssignorDto.document) {
      const assignorWithDocument = await this.prisma.assignor.findFirst({
        where: {
          document: updateAssignorDto.document,
        },
      });

      if (assignorWithDocument) {
        throw new ConflictException('Assignor already registered');
      }
    }

    const { document, name, email, phone } = updateAssignorDto;
    return this.prisma.assignor.update({
      where: { id },
      data: {
        document,
        name,
        email,
        phone,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const assignorExists = await this.findOne(id);

    if (!assignorExists) {
      throw new NotFoundException('Assignor not found');
    }

    await this.prisma.assignor.delete({ where: { id } });
  }
}
