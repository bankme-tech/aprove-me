import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AssignorService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAssignorDto: CreateAssignorDto) {
    const response = await this.prisma.assignor.create({
      data: {
        document: createAssignorDto.document,
        email: createAssignorDto.email,
        phone: createAssignorDto.phone,
        name: createAssignorDto.name,
      },
    });
    return response;
  }

  async findAll() {
    const response = await this.prisma.assignor.findMany();
    return response;
  }

  async findOne(id: string) {
    const response = await this.prisma.assignor.findUnique({
      where: { id },
    });
    return response;
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    const response = await this.prisma.assignor.update({
      where: { id },
      data: {
        document: updateAssignorDto.document,
        email: updateAssignorDto.email,
        phone: updateAssignorDto.phone,
        name: updateAssignorDto.name,
      },
    });
    return response;
  }

  async remove(id: string) {
    const response = await this.prisma.assignor.delete({
      where: { id },
    });
    return response;
  }
}
