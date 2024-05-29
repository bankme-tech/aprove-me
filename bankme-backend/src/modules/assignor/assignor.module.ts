import { Module } from '@nestjs/common';

import { AssignorController } from './assignor.controller';

// SERVICES
import { AssignorService } from './assignor.service';

@Module({
	controllers: [AssignorController],
	providers: [AssignorService],
	exports: [AssignorService],
})
export class AssignorModule {}
