import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from '../prisma.service';

/// CRUD gerado com o comando "nest g resource payable".
/**Camada de serviço da rota 'integrations/payable'. Inclui CRUD completo. */
@Injectable()
export class PayableService {
  constructor(private readonly prisma: PrismaService) {}

  /**Cadastra novo recebível no bando de dados. */
  async create(createPayableDto: CreatePayableDto) {
    const response = await this.prisma.payable.create({
      data: {
        value: createPayableDto.value,
        assignorId: createPayableDto.assignor,
      },
    });
    return response;
  }

  /**Retorna todos os recebíveis registrados no banco de dados. */
  async findAll() {
    const response = await this.prisma.payable.findMany();
    return response;
  }

  /**Busca um recebível pelo id e retorna seus dados. */
  async findOne(id: string) {
    const response = await this.prisma.payable.findUnique({
      where: { id },
    });

    if (!response) {
      return { status: 400, body: { message: 'Recebível não encontrado.' } };
    }
    return { status: 200, body: response };
  }

  /**Altera os dados de um recebível no banco de dados pelo id. */
  async update(id: string, updatePayableDto: UpdatePayableDto) {
    const response = await this.prisma.payable.update({
      where: { id },
      data: {
        value: updatePayableDto.value,
        assignorId: updatePayableDto.assignor,
      },
    });
    return response;
  }

  /**Busca e deleta um recebível pelo id. */
  async remove(id: string) {
    const response = await this.prisma.payable.delete({
      where: { id },
    });
    return response;
  }
}
