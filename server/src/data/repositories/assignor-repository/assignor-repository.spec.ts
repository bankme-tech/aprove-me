import { Test, TestingModule } from '@nestjs/testing';
import { AssignorRepository } from './assignor-repository';
import { PrismaService } from '../../../infra/prisma/prisma.service';

// jest.useFakeTimers({ now: new Date(2022, 11, 15, 0) });


const makeFakeAssignor = () => ({
    id: 'any_id',
    document: 'any_document',
    email: 'any_email',
    phone: 'any_phone',
    name: 'any_name'    
})

const makeFakeAssignorInDb = () => ({
    ...makeFakeAssignor(),
    password: 'any_password'
})

describe('AssignorRepository', () => {
    let sut: AssignorRepository;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AssignorRepository,
                {
                    provide: PrismaService,
                    useValue: {
                        assignor: {
                            create: jest.fn().mockResolvedValue(makeFakeAssignorInDb()),
                            findFirst: jest.fn().mockResolvedValue(makeFakeAssignorInDb()),
                            update: jest.fn().mockResolvedValue(makeFakeAssignorInDb()),
                            findMany: jest.fn().mockResolvedValue([makeFakeAssignorInDb(), makeFakeAssignorInDb()]),
                        },
                    },
                },
            ],
        }).compile();

        sut = module.get<AssignorRepository>(AssignorRepository);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    describe('create', () => {
        it('should call prisma.create with correct values', async () => {
            const createSpy = jest.spyOn(prismaService.assignor, 'create');
            await sut.create({
                document: 'any_document',
                email: 'any_email',
                phone: 'any_phone',
                name: 'any_name'
            });

            expect(createSpy).toHaveBeenCalledWith({
                data: {
                    document: 'any_document',
                    email: 'any_email',
                    phone: 'any_phone',
                    name: 'any_name'
                },
            });
        });

        it('should return an assignor on success', async () => {
            const result = await sut.create({
                document: 'any_document',
                email: 'any_email',
                phone: 'any_phone',
                name: 'any_name'
            });

            expect(result).toEqual(makeFakeAssignor());
        });
    });

    describe('findOne', () => {
        it('should call prisma.assignor.findFirst with correct values', async () => {
            const findSpy = jest.spyOn(prismaService.assignor, 'findFirst');
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

        it('should return an assignor on success', async () => {
            const result = await sut.findOne({ where: { id: 2, deletedAt: null } });

            expect(result).toEqual(makeFakeAssignor());
        });
    });

    describe('findAll', () => {
        it('should call prisma.assignor.findMany with correct values', async () => {
            const findManySpy = jest.spyOn(prismaService.assignor, 'findMany');
            await sut.findAll({
                where: { name: 'any_name' },
                take: 10,
                skip: 20
            });

            expect(findManySpy).toHaveBeenCalledWith({
                where: { name: 'any_name' },
                take: 10,
                skip: 20
            });
        });

        it('should return an assignor array on success', async () => {
            const result = await sut.findAll({
                where: { name: 'any_name' },
                take: 10,
                skip: 20
            });

            expect(result).toEqual([
                makeFakeAssignor(),
                makeFakeAssignor(),
            ]);
        });
    });

    describe('update', () => {
        it('should call prisma.assignor.update with correct values', async () => {
            const updateSpy = jest.spyOn(prismaService.assignor, 'update');
            await sut.update('any_id', {
                phone: 'any_phone',
                name: 'any_name',
            });

            expect(updateSpy).toHaveBeenCalledWith({
                where: { id: 'any_id' },
                data: {
                    phone: 'any_phone',
                    name: 'any_name',
                },
            });
        });

        it('should return an assignor on success', async () => {
            const result = await sut.update('any_id', {
                phone: 'any_phone',
                name: 'any_name',
            });

            expect(result).toEqual(makeFakeAssignor());
        });
    });

    describe('remove', () => {
        it('should call prisma.assignor.update with correct values', async () => {
            const updateSpy = jest.spyOn(prismaService.assignor, 'update');
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
