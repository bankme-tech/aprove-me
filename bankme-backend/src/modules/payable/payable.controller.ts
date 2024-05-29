import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';

// GUARDS
import { JwtGuard } from '../auth/guards/jwt.guard';

// SERVICES
import { PayableService } from './payable.service';

// DTOS
import { CreatePayableDTO } from './dtos/create-payable.dto';
import { UpdatePayableDTO } from './dtos/update-payable.dto';

@UseGuards(JwtGuard)
@Controller('integrations/payable')
export class PayableController {
	constructor(private readonly payableService: PayableService) {}

	@HttpCode(HttpStatus.OK)
	@Post()
	public async create(@Body() createPayableDto: CreatePayableDTO) {
		return this.payableService.createPayable(createPayableDto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('batch')
	public async batchCreate(@Body() payable: CreatePayableDTO[]) {
		return this.payableService.createPayableBatch(payable);
	}

	@HttpCode(HttpStatus.OK)
	@Get()
	public async findAll() {
		return this.payableService.findAllPayable();
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	public async findOne(@Param('id') id: string) {
		return this.payableService.findOnePayable(id);
	}

	@Patch(':id')
	public async update(
		@Param('id') id: string,
		@Body() updatePayableDto: UpdatePayableDTO,
	) {
		return this.payableService.updatePayable(id, updatePayableDto);
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.payableService.removePayable(id);
	}
}
