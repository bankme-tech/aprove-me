import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Permission } from "@prisma/client";

import { ApiKeyGuard } from "../guards/api-key.guard";
import { ZodPipe } from "../pipes/zod.pipe";
import { PrismaProvider } from "../providers/prisma.provider";
import { PermissionPipe } from "./permission.pipe";
import { UpsertPermissionInputDTO } from "./upsert-permission-input.dto";
import { UpsertPermissionInputSchema } from "./upsert-permission-input.schema";

@UseGuards(ApiKeyGuard)
@Controller("integrations/permission")
export class PermissionController {
  constructor(private readonly prisma: PrismaProvider) {}

  @Get()
  async find() {
    return await this.prisma.permission.findMany({
      select: { id: true, login: true },
    });
  }

  @Get()
  async findOne(
    @Param("id", ParseUUIDPipe, PermissionPipe) permission: Permission,
  ) {
    return permission;
  }

  @Post()
  async create(
    @Body(new ZodPipe(UpsertPermissionInputSchema))
    input: UpsertPermissionInputDTO,
  ) {
    const permission = await this.prisma.permission.findFirst({
      where: { login: input.login },
    });

    if (permission !== null) {
      throw new BadRequestException("login in use");
    }

    return await this.prisma.permission.create({
      data: { login: input.login, password: input.password },
      select: { id: true, login: true },
    });
  }

  @Put()
  async update(
    @Param("id", ParseUUIDPipe, PermissionPipe) permission: Permission,
    @Body(new ZodPipe(UpsertPermissionInputSchema))
    input: UpsertPermissionInputDTO,
  ) {
    const data =
      input.password.length > 0
        ? { login: input.login, password: input.password }
        : { login: input.login };

    return await this.prisma.permission.update({
      select: { id: true, login: true },
      where: { id: permission.id },
      data: data,
    });
  }

  @Delete()
  async delete(
    @Param("id", ParseUUIDPipe, PermissionPipe) permission: Permission,
  ) {
    return await this.prisma.permission.delete({
      select: { id: true, login: true },
      where: { id: permission.id },
    });
  }
}
