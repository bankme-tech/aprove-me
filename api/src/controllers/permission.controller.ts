import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ConflictException,
  UseGuards
} from '@nestjs/common';
import { PermissionsService } from '../services/permissions.service';
import { UUID } from 'crypto';
import { IsNotEmpty, IsString} from 'class-validator';
import { Permission as PermissionModel } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

export class Permission {
  id: UUID

  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsString()
  password: string
}

@UseGuards(AuthGuard)
@Controller('/integrations/permissions/')
export class PermissionController {
  constructor(private readonly permissionService: PermissionsService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() permissionData: Permission): Promise<PermissionModel> {
    const { login } = permissionData;

    const existingPermission = await this.permissionService.findUnique({ login });
    if (existingPermission) {
      throw new ConflictException('A permission with the same login already exists');
    }

    return this.permissionService.create(permissionData);
  }
}