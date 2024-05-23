import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

// CRUD gerado através do comando "nest g resource assignor".
/**Camada de controle da rota 'integrations/assignor'. Inclui CRUD completo. */
@Controller('integrations')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  /**Cadrasta no cedente no banco de dados. */
  @Post('assignor')
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  /**Retorna todos os cedentes cadastrados no banco de dados. */
  @Get('assignor')
  findAll() {
    return this.assignorService.findAll();
  }

  /**Busca um cendente por id e retorna os dados cadastrados. */
  @Get('assignor/:id')
  findOne(@Param('id') id: string) {
    return this.assignorService.findOne(id);
  }

  /**Altera os dados de um cedente cadastrado no banco de dados. */
  @Patch('assignor/:id')
  update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return this.assignorService.update(id, updateAssignorDto);
  }

  /**Busca um cedente pelo id e o remove do banco de dados. */
  @Delete('assignor/:id')
  remove(@Param('id') id: string) {
    return this.assignorService.remove(id);
  }
}
