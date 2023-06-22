import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';

interface CreateDto {
  data: CreateAssignorDto
}

@Injectable()
export class AssignorService {

  constructor (
    private readonly assignorRepository: AssignorRepository
  ) {}

  async create({ data }: CreateDto) {
    const {
      document, 
      email, 
      name, 
      phone
    } = data

    const checkIfAssignorAlreadyExists = await this.assignorRepository.findOne({
      where: {
        email
      }
    })

    if(checkIfAssignorAlreadyExists) {
      throw new UnauthorizedException('Assignor already exist')
    }

    return await this.assignorRepository.create({
      document, 
      email, 
      name, 
      phone
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} assignor`;
  }

  update(id: number, updateAssignorDto: UpdateAssignorDto) {
    return `This action updates a #${id} assignor`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignor`;
  }
}
