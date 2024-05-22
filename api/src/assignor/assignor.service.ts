import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from '../db/prisma.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class AssignorService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createAssignorDto: CreateAssignorDto) {
    const assignor = plainToClass(CreateAssignorDto, createAssignorDto);

    const errors = await validate(assignor);
    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map(
          (err) =>
            `${err.property} has wrong value ${err.value}, ${Object.values(err.constraints).join(', ')}`,
        ),
      );
    }

    const { document } = createAssignorDto;
    const assignorExists = await this.prisma.assignor.findUnique({
      where: { document },
    });

    if (assignorExists) {
      throw new BadRequestException('Assignor already exists');
    }

    return this.prisma.assignor.create({
      data: createAssignorDto,
    });
  }

  findAll() {
    return this.prisma.assignor.findMany();
  }

  findOne(id: string) {
    return this.prisma.assignor.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: string, updateAssignorDto: UpdateAssignorDto) {
    return this.prisma.assignor.update({
      where: { id },
      data: updateAssignorDto,
    });
  }

  remove(id: string) {
    return this.prisma.assignor.delete({
      where: { id },
    });
  }
}
