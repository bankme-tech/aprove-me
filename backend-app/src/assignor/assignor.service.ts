import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from '../prisma.service';

/**Camada de serviço da rota "integrations/assignor". Inclui CRUD compelto. */
@Injectable()
export class AssignorService {
  constructor(private readonly prisma: PrismaService) {}

  /**Cadrasta no cedente no banco de dados. */
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

  /**Retorna todos os cedentes cadastrados no banco de dados. */
  async findAll() {
    const response = await this.prisma.assignor.findMany();
    return response;
  }

  /**Busca um cendente por id e retorna os dados cadastrados. */
  async findOne(id: string) {
    const response = await this.prisma.assignor.findUnique({
      where: { id },
    });
    return response;
  }

  /**Altera os dados de um cedente cadastrado no banco de dados. */
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

  /**Busca um cedente pelo id e o remove do banco de dados. */
  async remove(id: string) {
    const response = await this.prisma.assignor.delete({
      where: { id },
    });
    return response;
  }
}
