import { Module } from '@nestjs/common';
import { AssignorExistsConstraint } from './assignor-exist.validator';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
    providers: [AssignorExistsConstraint, PrismaService],
})
export class UtilsModule { }
