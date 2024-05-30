import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Payable } from '@prisma/client';

// SERVICES
import { PrismaService } from '../prisma/prisma.service';
import { ProducerService } from '../amqp/producer.service';

// INTERFACES
import { IPayableService } from './interfaces/payable-service.interface';

// DTOS
import { CreatePayableDTO } from './dtos/create-payable.dto';
import { UpdatePayableDTO } from './dtos/update-payable.dto';

@Injectable()
export class PayableService implements IPayableService {
	private readonly logger: Logger = new Logger(PayableService.name);

	constructor(
		private readonly prismaService: PrismaService,
		private readonly producerService: ProducerService,
	) {}

	public async createPayable(data: CreatePayableDTO): Promise<Payable> {
		this.logger.log(`Payable - data: ${JSON.stringify(data)}`);

		const assignor = await this.prismaService.assignor.findFirst({
			where: {
				id: data.assignorId,
			},
		});
		if (!assignor) throw new BadRequestException(`Assignor not found`);

		return this.prismaService.payable.create({
			data,
		});
	}

	public async createPayableBatch(
		data: CreatePayableDTO[],
	): Promise<boolean> {
		this.logger.log(`CreatePayableBatch - data length: ${data.length}`);

		if (data.length > 10000)
			throw new BadRequestException(`Batch size exceed 10.000`);

		await this.producerService.addPayableToQueue(data);
		return true;
	}

	public async findAllPayable(): Promise<Payable[]> {
		this.logger.log(`FindAllPayable`);
		return this.prismaService.payable.findMany({
			orderBy: {
				createdAt: `desc`,
			},
		});
	}

	public async findOnePayable(payableId: string): Promise<Payable> {
		this.logger.log(`FindOnePayable - payableId: ${payableId}`);

		const payable = await this.prismaService.payable.findFirst({
			where: { id: payableId },
		});
		if (!payable) throw new BadRequestException('Payable not found');

		return payable;
	}

	public async updatePayable(
		payableId: string,
		data: UpdatePayableDTO,
	): Promise<Payable> {
		this.logger.log(
			`UpdatePayable - payableId: ${payableId} - data: ${JSON.stringify(data)}`,
		);

		const assignor = await this.prismaService.assignor.findFirst({
			where: {
				id: data.assignorId,
			},
		});
		if (!assignor) throw new BadRequestException(`Assignor not found`);

		return this.prismaService.payable.update({
			where: { id: payableId },
			data,
		});
	}

	public async removePayable(payableId: string): Promise<Payable> {
		this.logger.log(`RemovePayable - payableId: ${payableId}`);
		return this.prismaService.payable.delete({
			where: { id: payableId },
		});
	}
}
