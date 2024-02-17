import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListAuthDto } from './dto/list-auth.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create a user',
    type: CreateAuthDto,
  })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get user list',
    type: ListAuthDto,
  })
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get user By Id',
    type: CreateAuthDto,
  })
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Change user By Id',
    type: UpdateAuthDto,
  })
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Remove user By Id',
    type: CreateAuthDto,
  })
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
