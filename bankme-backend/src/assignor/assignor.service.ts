import { Injectable } from '@nestjs/common';
import { CreateAssignorDto, UpdateAssignorDto } from './dto/assignor.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AssignorService {
  constructor(private readonly db: DbService) {}

  async getAssignorById(id: string) {
    const assignor = await this.db.assignor.findUnique({
      where: { id },
    });
    return assignor;
  }

  async createAssignor(dto: CreateAssignorDto) {
    const { document, email, name, phone } = dto;
    const assignor = await this.db.assignor.create({
      data: {
        document,
        email,
        name,
        phone,
      },
    });

    return assignor;
  }

  async updateAssignor(id: string, dto: UpdateAssignorDto) {
    const { document, email, name, phone } = dto;
    const updatedAssignor = await this.db.assignor.update({
      where: { id },
      data: { document, email, name, phone },
    });

    return updatedAssignor;
  }

  async deleteAssignor(id: string) {
    await this.db.assignor.delete({
      where: {
        id,
      },
    });
  }
}
