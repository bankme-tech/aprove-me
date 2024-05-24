import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AssignorsService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignorDto: CreateAssignorDto) {
    return this.prisma.assignor.create({
      data: createAssignorDto,
    });
  }

  async findAll() {
    return this.prisma.assignor.findMany();
  }

  async findOne(id: string) {
    return this.prisma.assignor.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    return this.prisma.assignor.update({
      where: { id },
      data: updateAssignorDto,
    });
  }

  async remove(id: string) {
    return this.prisma.assignor.delete({
      where: { id },
    });
  }
}
