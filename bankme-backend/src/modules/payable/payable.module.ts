import { Module } from '@nestjs/common';

import { PayableController } from './payable.controller';

// SERVICES
import { PayableService } from './payable.service';

@Module({
	controllers: [PayableController],
	providers: [PayableService],
	exports: [PayableService],
})
export class PayableModule {}
