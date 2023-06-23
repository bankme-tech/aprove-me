import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';

interface CreateDto {
  data: CreateAssignorDto
}
interface ListDto {
  filters: any;
  page: number;
  itemsPerPage: number;
}
interface UpdateDto {
  id: string; 
  data: UpdateAssignorDto
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

  async findOne({ id }: { id: string }) {
    return await this.assignorRepository.findOne({
      where: {
        id
      }
    })
  }

  async findAll({ filters, page, itemsPerPage }: ListDto) {

    const { email, name } = filters

    return await this.assignorRepository.findAll({
      where: { email, name }, // TODO - IMPROVE FILTER
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
    })
  }

  async update({ id, data }: UpdateDto) {
    const {
      name, 
      phone
    } = data

    const checkIfAssignorExists = await this.assignorRepository.findOne({
      where: {
        id
      }
    })

    if(!checkIfAssignorExists) {
      throw new UnauthorizedException('Assignor not found')
    }

    return await this.assignorRepository.update(id, {
      name, 
      phone
    })
  }

  async remove({ id }:{ id: string }) {
    // TODO - ADD REMOVED AT ON CONDITION
    const checkIfAssignorExists = await this.assignorRepository.findOne({
      where: {
        id
      }
    })

    if(!checkIfAssignorExists) {
      throw new UnauthorizedException('Assignor not found')
    }

    await this.assignorRepository.remove(id)
  }
}
