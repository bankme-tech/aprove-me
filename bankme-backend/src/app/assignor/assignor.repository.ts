import { Injectable } from '@nestjs/common';
import { CreateAssignorDto, UpdateAssignorDto } from './dto/assignor.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AssignorRepository {
  constructor(private readonly db: DbService) {}

  async findById(id: string) {
    return this.db.assignor.findUnique({ where: { id } });
  }

  async findAll() {
    return this.db.assignor.findMany();
  }

  async create(dto: CreateAssignorDto) {
    const { document, email, name, phone } = dto;
    return this.db.assignor.create({
      data: {
        document,
        email,
        name,
        phone,
      },
    });
  }

  async update(id: string, dto: UpdateAssignorDto) {
    const { document, email, name, phone } = dto;
    return this.db.assignor.update({
      where: { id },
      data: { document, email, name, phone },
    });
  }

  async delete(id: string) {
    await this.db.assignor.delete({ where: { id } });
  }
}
