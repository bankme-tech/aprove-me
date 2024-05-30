import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Payable, Assignor } from '@prisma/client';

// SERVICES
import { PayableService } from './payable.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProducerService } from '../amqp/producer.service';
import { AmqpService } from '../amqp/amqp.service';

// DTOS
import { CreatePayableDTO } from './dtos/create-payable.dto';
import { UpdatePayableDTO } from './dtos/update-payable.dto';

const payableMockList: Payable[] = [
	{
		id: '5c480802-c0b4-42bd-86f7-78eda0381350',
		value: 150,
		emissionDate: new Date(),
		assignorId: 'f1d2654e-d66d-4688-a96f-628a886012e7',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '7bfbff9e-9ddf-4b86-a7b9-941de31a9dd0',
		value: 200,
		emissionDate: new Date(),
		assignorId: 'f1d2654e-d66d-4688-a96f-628a886012e7',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

const assignorMock: Assignor = {
	id: 'f1d2654e-d66d-4688-a96f-628a886012e7',
	document: '12345678901',
	email: 'assignor1@email.com',
	phone: '40028922',
	name: 'Assignor1',
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe('PayableService', () => {
	let payableService: PayableService;
	let prismaService: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PayableService,
				ProducerService,
				AmqpService,
				{
					provide: PrismaService,
					useValue: {
						payable: {
							findMany: jest
								.fn()
								.mockResolvedValue(payableMockList),
							create: jest
								.fn()
								.mockResolvedValue(payableMockList[0]),
							findFirst: jest
								.fn()
								.mockResolvedValue(payableMockList[1]),
							update: jest
								.fn()
								.mockResolvedValue(payableMockList[0]),
							delete: jest
								.fn()
								.mockResolvedValue(payableMockList[1]),
						},
						assignor: {
							findFirst: jest
								.fn()
								.mockResolvedValue(assignorMock),
						},
					},
				},
			],
		}).compile();

		payableService = module.get<PayableService>(PayableService);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	describe('createPayable', () => {
		test('should create a payable', async () => {
			const payablePayload: CreatePayableDTO = {
				value: 10,
				assignorId: 'f1d2654e-d66d-4688-a96f-628a886012e7',
			};
			const result = await payableService.createPayable(payablePayload);

			expect(result).toEqual(payableMockList[0]);
		});

		test('should throw an error if assignor does not exist', async () => {
			const payablePayload: CreatePayableDTO = {
				value: 100,
				assignorId: '123e4567-e89b-12d3-a456-4266141740500',
			};
			jest.spyOn(
				prismaService.assignor,
				'findFirst',
			).mockRejectedValueOnce(
				new BadRequestException('Assignor not found'),
			);

			try {
				await payableService.createPayable(payablePayload);
			} catch (error) {
				expect(error.message).toBe('Assignor not found');
			}
		});
	});

	describe('findAllPayable', () => {
		test('should return an array of payable', async () => {
			const result = await payableService.findAllPayable();

			expect(result).toEqual(payableMockList);
		});
	});

	describe('findOnePayable', () => {
		test('should return a payable', async () => {
			const result = await payableService.findOnePayable(
				`7bfbff9e-9ddf-4b86-a7b9-941de31a9dd0`,
			);

			expect(result).toEqual(payableMockList[1]);
		});

		test('should throw an error if payable does not exist', async () => {
			jest.spyOn(
				prismaService.payable,
				'findFirst',
			).mockRejectedValueOnce(
				new BadRequestException('Payable not found'),
			);

			try {
				await payableService.findOnePayable(`random-id`);
			} catch (error) {
				expect(error.message).toBe('Payable not found');
			}
		});
	});

	describe('updatePayable', () => {
		test('should update a payable', async () => {
			const payableId = '5c480802-c0b4-42bd-86f7-78eda0381350';
			const payableUpdate: UpdatePayableDTO = {
				value: 100,
				assignorId: 'f1d2654e-d66d-4688-a96f-628a886012e7',
			};

			const result = await payableService.updatePayable(
				payableId,
				payableUpdate,
			);

			expect(result).toEqual(payableMockList[0]);
		});

		test('should throw an error if payable does not exist', async () => {
			const id = 'random-id';
			const payableUpdate = {
				value: 1000,
				assignor: '7bfbff9e-9ddf-4b86-a7b9-941de31a9dd0',
			};
			jest.spyOn(prismaService.payable, 'update').mockRejectedValueOnce(
				new BadRequestException('Payable not found'),
			);

			try {
				await payableService.updatePayable(id, payableUpdate);
			} catch (error) {
				expect(error.message).toBe('Payable not found');
			}
		});

		test('should throw an error if assignor does not exist', async () => {
			const id = '7bfbff9e-9ddf-4b86-a7b9-941de31a9dd0';
			const payableUpdate = {
				value: 1000,
				assignorId: 'random-id',
			};
			jest.spyOn(
				prismaService.assignor,
				'findFirst',
			).mockRejectedValueOnce(
				new BadRequestException('Assignor not found'),
			);

			try {
				await payableService.updatePayable(id, payableUpdate);
			} catch (error) {
				expect(error.message).toBe('Assignor not found');
			}
		});
	});

	describe('removePayable', () => {
		test('should remove a payable', async () => {
			const id = '7bfbff9e-9ddf-4b86-a7b9-941de31a9dd0';
			const result = await payableService.removePayable(id);

			expect(result.id).toEqual(id);
		});

		it('should throw an error if payable does not exist', async () => {
			const id = '7bfbff9e-9ddf-4b86-a7b9-941de31a9dd0';
			jest.spyOn(prismaService.payable, 'delete').mockRejectedValueOnce(
				new BadRequestException('Payable not found'),
			);

			try {
				await payableService.removePayable(id);
			} catch (error) {
				expect(error.message).toBe('Payable not found');
			}
		});
	});
});
