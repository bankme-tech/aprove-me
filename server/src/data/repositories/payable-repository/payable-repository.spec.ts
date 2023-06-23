import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepository } from './payable-repository';
import { PrismaService } from '../../../infra/prisma/prisma.service';

const makeFakePayable = () => ({
    id: 'any_id',
    assignorId: 'any_assignor_id',
    emissionDate: 'any_emission_date',
    valueInCents: 10000
})

describe('PayableRepository', () => {
    let sut: PayableRepository;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PayableRepository,
                {
                    provide: PrismaService,
                    useValue: {
                        payable: {
                            create: jest.fn().mockResolvedValue(makeFakePayable()),
                            findFirst: jest.fn().mockResolvedValue(makeFakePayable()),
                            update: jest.fn().mockResolvedValue(makeFakePayable()),
                            findMany: jest.fn().mockResolvedValue([makeFakePayable(), makeFakePayable()]),
                        },
                    },
                },
            ],
        }).compile();

        sut = module.get<PayableRepository>(PayableRepository);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    describe('create', () => {
        it('should call prisma.create with correct values', async () => {
            const createSpy = jest.spyOn(prismaService.payable, 'create');
            await sut.create({
                assignorId: 'any_assignor_id',
                emissionDate: 'any_emission_date',
                valueInCents: 10000
            });

            expect(createSpy).toHaveBeenCalledWith({
                data: {
                    assignorId: 'any_assignor_id',
                    emissionDate: 'any_emission_date',
                    valueInCents: 10000
                },
            });
        });

        it('should return an payable on success', async () => {
            const result = await sut.create({
                assignorId: 'any_assignor_id',
                emissionDate: 'any_emission_date',
                valueInCents: 10000
            });

            expect(result).toEqual(makeFakePayable());
        });
    });

    describe('findOne', () => {
        it('should call prisma.payable.findFirst with correct values', async () => {
            const findSpy = jest.spyOn(prismaService.payable, 'findFirst');
            await sut.findOne({
                where: {
                    id: 'any_id'
                }
            });

            expect(findSpy).toHaveBeenCalledWith({
                where: {
                    id: 'any_id'
                }
            });
        });

        it('should return an payable on success', async () => {
            const result = await sut.findOne({ where: { id: 2, deletedAt: null } });

            expect(result).toEqual(makeFakePayable());
        });
    });

    describe('findAll', () => {
        it('should call prisma.payable.findMany with correct values', async () => {
            const findManySpy = jest.spyOn(prismaService.payable, 'findMany');
            await sut.findAll({
                where: { assignorId: 'any_assignor_id' },
                take: 10,
                skip: 20
            });

            expect(findManySpy).toHaveBeenCalledWith({
                where: { assignorId: 'any_assignor_id' },
                take: 10,
                skip: 20
            });
        });

        it('should return an payable array on success', async () => {
            const result = await sut.findAll({
                where: { name: 'any_name' },
                take: 10,
                skip: 20
            });

            expect(result).toEqual([
                makeFakePayable(),
                makeFakePayable(),
            ]);
        });
    });

    describe('update', () => {
        it('should call prisma.payable.update with correct values', async () => {
            const updateSpy = jest.spyOn(prismaService.payable, 'update');
            await sut.update('any_id', {
                valueInCents: 10000
            });

            expect(updateSpy).toHaveBeenCalledWith({
                where: { id: 'any_id' },
                data: {
                    valueInCents: 10000
                },
            });
        });

        it('should return an payable on success', async () => {
            const result = await sut.update('any_id', {
                phone: 'any_phone',
                name: 'any_name',
            });

            expect(result).toEqual(makeFakePayable());
        });
    });

    describe('remove', () => {
        it('should call prisma.payable.update with correct values', async () => {
            const updateSpy = jest.spyOn(prismaService.payable, 'update');
            await sut.remove('any_id');

            expect(updateSpy).toHaveBeenCalledWith({
                where: { id: 'any_id' },
                data: {
                    deletedAt: expect.any(Date)
                },
            });
        });
    });
});
