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
import { AssignorService } from './assignor.service';

// DTOS
import { CreateAssignorDTO } from './dtos/create-assignor.dto';
import { UpdateAssignorDTO } from './dtos/update-assignor.dto';

@UseGuards(JwtGuard)
@Controller('integrations/assignor')
export class AssignorController {
	constructor(private readonly assignorService: AssignorService) {}

	@HttpCode(HttpStatus.OK)
	@Post()
	public async createAssignor(@Body() body: CreateAssignorDTO) {
		return this.assignorService.createAssignor(body);
	}

	@HttpCode(HttpStatus.OK)
	@Get(`:id`)
	public async getAssignor(@Param(`id`) assignorId: string) {
		return this.assignorService.getAssignor(assignorId);
	}

	@Get()
	public async findAll() {
		return this.assignorService.findAll();
	}

	@HttpCode(HttpStatus.OK)
	@Patch(`:id`)
	public async updateAssignor(
		@Param(`id`) assignorId: string,
		@Body() updateAssignorDto: UpdateAssignorDTO,
	) {
		return this.assignorService.updateAssignor(
			assignorId,
			updateAssignorDto,
		);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(`:id`)
	public async deleteAssignor(@Param(`id`) assigorId: string) {
		return this.assignorService.deleteAssignor(assigorId);
	}
}
