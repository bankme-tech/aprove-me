import { Module } from "@nestjs/common";

import { PermissionController } from "./permission.controller";

@Module({ controllers: [PermissionController] })
export class PermissionModule {}
