import { Injectable, Logger } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from 'src/database/prisma.service';
@Injectable()
export class AssignorService {
  private readonly logger = new Logger(AssignorService.name);

  constructor(private prisma: PrismaService) { }

  create(createAssignorDto: CreateAssignorDto) {
    return this.prisma.assignor.create({ data: createAssignorDto });
  }

  findAll() {
    return this.prisma.assignor.findMany();
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
