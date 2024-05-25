import { Test, TestingModule } from '@nestjs/testing'
import { Response, Request } from 'express'
import { HttpStatus } from '@nestjs/common'
import { PayableController } from './payable.controller'
import { PayableService } from './payables.service'
import { PayableDto } from './dto/create-payable'
import * as helpers from '../shared/helpers'

jest.mock('axios')
jest.mock('../shared/helpers')

describe('PayableController', () => {
  let controller: PayableController
  let payableService: PayableService

  const assignorDto = {
    id: '22e7db6b-7bcc-4b68-bdfe-1d88e79c17d47',
    document: 'doc1',
    email: 'test@example.com',
    phone: '1234567890',
    name: 'Test Assignor',
  }

  const payableDto: PayableDto = {
    value: 860.45,
    emissionDate: '1970-01-01',
    assignor: assignorDto.id,
  }

  const createdPayable = { ...payableDto, id: '39e7db6b-8add-4b68-bdfe-1d88e79c17d4' }

  const mockRequest: Partial<Request> = {
    body: payableDto,
  }

  const mockResponse: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [
        {
          provide: PayableService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
            update: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<PayableController>(PayableController)
    payableService = module.get<PayableService>(PayableService)
  })

  describe('create', () => {
    it('should create a payable', async () => {
      const emptyMock = helpers.isEmptyOrNull as jest.Mock
      const validDateMock = helpers.isValidDate as jest.Mock
      const payableServiceMock = payableService.create as jest.Mock

      emptyMock.mockReturnValue(false)
      validDateMock.mockReturnValue(true)
      payableServiceMock.mockResolvedValue(createdPayable);

      await controller.create(payableDto, mockResponse as Response, mockRequest as Request)

      expect(payableService.create).toHaveBeenCalledWith(payableDto)
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED)
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [createdPayable],
        status: HttpStatus.CREATED,
        message: 'Successfully created'
      })
    })
  })

  describe('findOne', () => {
    it('should find a payable by id', async () => {
      const findOneMock = payableService.findOne as jest.Mock
      findOneMock.mockResolvedValue(createdPayable)

      await controller.findOne('39e7db6b-8add-4b68-bdfe-1d88e79c17d4', mockResponse as Response)

      expect(payableService.findOne).toHaveBeenCalledWith('39e7db6b-8add-4b68-bdfe-1d88e79c17d4')
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [createdPayable],
        status: HttpStatus.OK,
        message: 'Successfully found'
      })
    })
  })

  describe('delete', () => {
    it('should delete a payable by id', async () => {
      const payableServiceMock = payableService.delete as jest.Mock
      payableServiceMock.mockResolvedValue(createdPayable)

      await controller.delete('39e7db6b-8add-4b68-bdfe-1d88e79c17d4', mockResponse as Response)

      expect(payableService.delete).toHaveBeenCalledWith('39e7db6b-8add-4b68-bdfe-1d88e79c17d4')
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT)
    })
  })

  describe('update', () => {
    it('should update a payable by id', async () => {
      const updatedPayable = { ...payableDto, id: '39e7db6b-8add-4b68-bdfe-1d88e79c17d4' }
      const updateMock = payableService.update as jest.Mock
      updateMock.mockResolvedValue(updatedPayable)

      await controller.update(payableDto, '39e7db6b-8add-4b68-bdfe-1d88e79c17d4', mockResponse as Response)

      expect(payableService.update).toHaveBeenCalledWith('39e7db6b-8add-4b68-bdfe-1d88e79c17d4', payableDto)
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK)
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [updatedPayable],
        status: HttpStatus.OK,
        message: 'Successfully updated'
      })
    })
  })
})
