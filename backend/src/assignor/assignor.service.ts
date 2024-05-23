import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { Assignor } from './entities/assignor.entity';

@Injectable()
export class AssignorService {
  constructor(private prismaService: PrismaService) { }

  async create(createAssignorDto: CreateAssignorDto) {
    const assignor = new Assignor(createAssignorDto);
    const assignorData = await this.prismaService.assignor.create({
      data: {
        document: assignor.document,
        email: assignor.email,
        name: assignor.name,
        phone: assignor.phone,
      },
    });
    return assignorData;
  }

  async findAll() {
    return this.prismaService.assignor.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.assignor.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateAssignorDto: UpdateAssignorDto) {
    return `This action updates a #${id} assignor`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignor`;
  }
}
