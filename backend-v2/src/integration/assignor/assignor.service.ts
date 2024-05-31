import { Injectable, Logger } from '@nestjs/common';
import type { CreateAssignorDto } from './dto/create-assignor.dto';
import type { UpdateAssignorDto } from './dto/update-assignor.dto';
import type { PrismaService } from 'src/database/prisma.service';
import { Pagination } from 'src/types/Pagination';


@Injectable()
export class AssignorService {
  private readonly logger = new Logger(AssignorService.name);

  constructor(private prisma: PrismaService) { }

  create(createAssignorDto: CreateAssignorDto) {
    return this.prisma.assignor.create({ data: createAssignorDto });
  }

  findAll(params : Pagination) {
    return this.prisma.assignor.findMany(params);
  }

  findOne(id: string) {
    return this.prisma.assignor.findUnique({ where: { id } });
  }

  update(id: string, updateAssignorDto: UpdateAssignorDto) {
    return this.prisma.assignor.update({
      where: { id },
      data: updateAssignorDto,
    });
  }

  remove(id: string) {
    return this.prisma.assignor.delete({ where: { id } });
  }
}
