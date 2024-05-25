import { Test, TestingModule } from '@nestjs/testing'
import { Response, Request } from 'express'
import { HttpStatus } from '@nestjs/common'
import { AssignorController } from './assignors.controller'
import { AssignorService } from './assignors.service'


const axios = require('axios')
jest.mock('axios')
describe('AssignorController', () => {
  let controller: AssignorController
  let assignorService: AssignorService

  const assignorDto = {
    id: '64a08870-3bc7-4f99-afa2-55c39ccc9cdd',
    document: 'doc1',
    email: 'test@example.com',
    phone: '1234567890',
    name: 'Test Assignor',
  }

  const mockRequest: Partial<Request> = {
    body: assignorDto,
  }
  const mockResponse: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [AssignorService],
    }).compile()

    controller = module.get<AssignorController>(AssignorController)
    assignorService = module.get<AssignorService>(AssignorService)
  })

  it('should create an assignor', async () => {
    const createdAssignor = { ...assignorDto, id: '1' }
    jest.spyOn(assignorService, 'create').mockResolvedValue(createdAssignor)

    await controller.create(assignorDto, mockResponse as Response, mockRequest as Request)

    expect(assignorService.create).toHaveBeenCalledWith(assignorDto)
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED)
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: [createdAssignor],
      status: HttpStatus.CREATED,
      message: 'Successfully created',
    })
  })

  it('should found an assignor', async () => {
    const createdAssignor = assignorDto
    jest.spyOn(assignorService, 'findOne').mockResolvedValue(createdAssignor)

    await controller.findOne(assignorDto.id, mockResponse as Response)

    expect(assignorService.findOne).toHaveBeenCalledWith(assignorDto.id)
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK)
  })

  it('should update an assignor', async () => {
    const updatedAssignor = { ...assignorDto, name: 'Updated Name' }
    jest.spyOn(assignorService, 'update').mockResolvedValue(updatedAssignor)

    await expect(controller.update(assignorDto, assignorDto.id, mockResponse as Response))

    expect(assignorService.update).toHaveBeenCalledWith(assignorDto.id, assignorDto)
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: [updatedAssignor],
      status: HttpStatus.OK,
      message: 'Successfully updated',
    })
  });
})