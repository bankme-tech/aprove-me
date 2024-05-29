import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Assignor } from '@prisma/client';

// SERVICES
import { PrismaService } from '../prisma/prisma.service';

// INTERFACES
import { IAssignorService } from './interfaces/assignor-service.interface';

//DTOS
import { CreateAssignorDTO } from './dtos/create-assignor.dto';
import { UpdateAssignorDTO } from './dtos/update-assignor.dto';

@Injectable()
export class AssignorService implements IAssignorService {
	private readonly logger: Logger = new Logger(AssignorService.name);

	constructor(private readonly prismaService: PrismaService) {}

	public async createAssignor(data: CreateAssignorDTO): Promise<Assignor> {
		this.logger.log(`CreateAssignor - data: ${data}`);

		const assignorExists = await this.prismaService.assignor.findUnique({
			where: { document: data.document },
		});

		if (assignorExists) {
			throw new BadRequestException('Assignor already exists');
		}

		return this.prismaService.assignor.create({ data });
	}

	public async getAssignor(assignorId: string): Promise<Assignor | null> {
		this.logger.log(`GetAssignor - assignorId: ${assignorId}`);
		return this.prismaService.assignor.findFirst({
			where: { id: assignorId },
		});
	}

	public async findAll(): Promise<Assignor[]> {
		return this.prismaService.assignor.findMany();
	}

	public async updateAssignor(
		id: string,
		updateAssignorDto: UpdateAssignorDTO,
	): Promise<Assignor> {
		return await this.prismaService.assignor.update({
			where: { id },
			data: updateAssignorDto,
		});
	}

	public async deleteAssignor(id: string): Promise<Assignor> {
		return await this.prismaService.assignor.delete({
			where: { id },
		});
	}
}
