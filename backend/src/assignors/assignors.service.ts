import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Assignor, Prisma } from '@prisma/client';

@Injectable()
export class AssignorsService {
  constructor(private prisma: PrismaService) {}
  
  create(data: Prisma.AssignorCreateInput): Promise<Assignor> {
    return this.prisma.assignor.create({
      data,
    });
  }

  findAll() {
    return `This action returns all assignors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignor`;
  }

  update(id: number, updateAssignorDto: UpdateAssignorDto) {
    return `This action updates a #${id} assignor`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignor`;
  }
}
