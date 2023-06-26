import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';
import { UnauthorizedException } from '@nestjs/common';
import { BcryptAdapter } from '../../infra/bcrypt/bcrypt-adapter';
import { MailerService } from '../../infra/mailer/mailer';

const makeFakeAssignor = () => ({
  id: 'any_id',
  document: 'any_document',
  email: 'any_email',
  phone: 'any_phone',
  name: 'any_name',
  username: 'any_username',
})

describe('AssignorService', () => { 
  let sut: AssignorService;
  let assignorRepository: AssignorRepository;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ 
        AssignorService,
        {
          provide: AssignorRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(makeFakeAssignor()),
            findOne: jest.fn().mockResolvedValue(makeFakeAssignor()),
            findOneByUsername: jest.fn().mockResolvedValue({...makeFakeAssignor(), password: 'encripted_password'}),
            findAll: jest.fn().mockResolvedValue([makeFakeAssignor(), makeFakeAssignor()]),
            update: jest.fn().mockResolvedValue(makeFakeAssignor()),
            remove: jest.fn()
          }
        },
        {
          provide: BcryptAdapter,
          useValue: {
            hash: jest.fn().mockResolvedValue('hashed_password')
          }
        },
        {
          provide: MailerService,
          useValue: {
            sendEmail: jest.fn()
          }
        }
      ],
    }).compile();

    sut = module.get<AssignorService>(AssignorService);
    assignorRepository = module.get<AssignorRepository>(AssignorRepository);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.findOne with correct values', async () => {
      const findOneSpy = jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)

      await sut.create({
        data: {
          document: 'any_document',
          email: 'any_email',
          phone: 'any_phone',
          name: 'any_name',
          username: 'any_username',
          password: 'any_password'
        }
      })

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          email: 'any_email',
          deletedAt: null
        }
      })
    });

    it('should throw if assignor already exists', async () => {
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce({ id: 'any_id' })

      const promise = sut.create({
        data: {
          document: 'any_document',
          email: 'any_email',
          phone: 'any_phone',
          name: 'any_name',
          username: 'any_username',
          password: 'any_password'
        }
      })

      await expect(promise).rejects.toThrowError(new UnauthorizedException('Assignor already exist'))
    });

    it('should throw if username already exists', async () => {
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce({ id: 'any_id' })

      const promise = sut.create({
        data: {
          document: 'any_document',
          email: 'any_email',
          phone: 'any_phone',
          name: 'any_name',
          username: 'any_username',
          password: 'any_password'
        }
      })

      await expect(promise).rejects.toThrowError(new UnauthorizedException('Username already in use'))
    });

    it('should call repository.create with correct values', async () => {
      const createSpy = jest.spyOn(assignorRepository, 'create')
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)

      await sut.create({
        data: {
          document: 'any_document',
          email: 'any_email',
          phone: 'any_phone',
          name: 'any_name', 
          username: 'any_username',
          password: 'any_password'
        }
      })

      expect(createSpy).toHaveBeenCalledWith({
        document: 'any_document',
        email: 'any_email',
        phone: 'any_phone',
        name: 'any_name',
        username: 'any_username',
        password: 'hashed_password',
        createdBy: 'any',
        updatedBy: 'any'
      })
    });

    it('should return a assignor entity on success', async () => {
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)

      const result = await sut.create({
        data: {
          document: 'any_document',
          email: 'any_email',
          phone: 'any_phone',
          name: 'any_name',
          username: 'any_username',
          password: 'any_password'
        }
      })

      expect(result).toEqual({
        id: 'any_id',
        document: 'any_document',
        email: 'any_email',
        phone: 'any_phone',
        name: 'any_name',
        username: 'any_username',
      })
    });
  });

  describe('findOne', () => {
    it('should call repository with correct values', async () => {
      const findOneSpy = jest.spyOn(assignorRepository, 'findOne')
      await sut.findOne({id: 'any_id'})
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 'any_id',
          deletedAt: null
        }
      })
    });

    it('should return a entity on success', async () => {
      const result = await sut.findOne({id: 'any_id'})
      expect(result).toEqual(makeFakeAssignor())
    });
  });

  describe('findOneByUsername', () => {
    it('should call repository with correct values', async () => {
      const findOneSpy = jest.spyOn(assignorRepository, 'findOneByUsername')
      await sut.findOneByUsername({ username: 'any_username' })
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          username: 'any_username',
          deletedAt: null
        }
      })
    });

    it('should return a entity on success', async () => {
      const result = await sut.findOneByUsername({ username: 'any_username' })
      expect(result).toEqual({...makeFakeAssignor(), password: 'encripted_password'})
    });
  });

  describe('findAll', () => {
    it('should call repository with correct values', async () => {
      const findAllSpy = jest.spyOn(assignorRepository, 'findAll')
      await sut.findAll({filters: {}, page: 1, itemsPerPage: 10})
      expect(findAllSpy).toHaveBeenCalledWith({
        where: {
          deletedAt: null
        },
        take: 10,
        skip: 0
      })
    });

    it('should call repository with correct values and filters', async () => {
      const findAllSpy = jest.spyOn(assignorRepository, 'findAll')
      await sut.findAll({filters: {name: 'any_name'}, page: 3, itemsPerPage: 10})
      expect(findAllSpy).toHaveBeenCalledWith({
        where: { 
          deletedAt: null,
          name: {
            contains: 'any_name',
            mode: 'insensitive',
          } 
        },
        take: 10,
        skip: 20
      })
    });

    it('should return a entity on success', async () => {
      const result = await sut.findAll({filters: {}, page: 1, itemsPerPage: 10})
      expect(result).toEqual([makeFakeAssignor(), makeFakeAssignor()])
    });
  });

  describe('update', () => {
    it('should call repository.findOne with correct values', async () => {
      const findOneSpy = jest.spyOn(assignorRepository, 'findOne')

      await sut.update({
        id: 'any_id',
        data: {
          phone: 'any_phone',
          name: 'any_name',
        }
      })

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 'any_id',
          deletedAt: null
        }
      })
    });

    it('should throw if assignor already exists', async () => {
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)

      const promise = sut.update({
        id: 'any_id',
        data: {
          phone: 'any_phone',
          name: 'any_name',
        }
      })

      await expect(promise).rejects.toThrowError(new UnauthorizedException('Assignor not found'))
    });

    it('should call repository with correct values', async () => {
      const updateSpy = jest.spyOn(assignorRepository, 'update')
      await sut.update({
        id: 'any_id',
        data: {
          phone: 'any_phone',
          name: 'any_name',
        }
      })
      expect(updateSpy).toHaveBeenCalledWith('any_id',{
          phone: 'any_phone',
          name: 'any_name',
      })
    });

    it('should return a entity on success', async () => {
      const result = await sut.update({
        id: 'any_id',
        data: {
          phone: 'any_phone',
          name: 'any_name',
        }
      })
      expect(result).toEqual(makeFakeAssignor())
    });
  });

  describe('remove', () => {
    it('should call repository.findOne with correct values', async () => {
      const findOneSpy = jest.spyOn(assignorRepository, 'findOne')

      await sut.remove({
        id: 'any_id'
      })

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 'any_id',
          deletedAt: null
        }
      })
    });

    it('should throw if assignor already exists', async () => {
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)

      const promise = sut.remove({
        id: 'any_id'
      })

      await expect(promise).rejects.toThrowError(new UnauthorizedException('Assignor not found'))
    });

    it('should call repository with correct values', async () => {
      const removeSpy = jest.spyOn(assignorRepository, 'remove')
      await sut.remove({
        id: 'any_id'
      })
      expect(removeSpy).toHaveBeenCalledWith('any_id')
    });
  });
  
  describe('sendEmailToId', () => {
    it('should call repository with correct values', async () => {
      const findOneSpy = jest.spyOn(assignorRepository, 'findOne')
      await sut.sendEmailToId({id: 'any_id'})
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 'any_id',
          deletedAt: null
        }
      })
    });

    it('should call mailer with correct email', async () => {
      const mailerSpy = jest.spyOn(mailerService, 'sendEmail')
      await sut.sendEmailToId({id: 'any_id'})
      expect(mailerSpy).toHaveBeenCalledWith({ to: makeFakeAssignor().email })
    });
  });
});
