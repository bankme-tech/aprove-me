import { Module } from '@nestjs/common';
import { AssignorExistsConstraint } from './assignor-exists.validator';
import { PrismaService } from '../prisma/prisma.service';


@Module({
    providers: [AssignorExistsConstraint, PrismaService],
})
export class UtilsModule { }
