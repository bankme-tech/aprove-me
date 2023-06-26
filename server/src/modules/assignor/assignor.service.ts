import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';
import { buildFindAllFilters } from './helpers/build-filters';
import { Filters } from './dto/list-assignor.dto';
import { BcryptAdapter } from '../../infra/bcrypt/bcrypt-adapter';
import { MailerService } from '../../infra/mailer/mailer';

interface CreateDto {
  data: CreateAssignorDto
}
interface ListDto {
  filters: Filters;
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
    private readonly assignorRepository: AssignorRepository,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly mailer: MailerService
  ) {}

  async create({ data }: CreateDto) {
    const {
      document, 
      email, 
      name, 
      phone,
      username,
      password
    } = data

    const checkIfAssignorAlreadyExists = await this.assignorRepository.findOne({
      where: {
        email,
        deletedAt: null
      }
    })

    if(checkIfAssignorAlreadyExists) {
      throw new UnauthorizedException('Assignor already exist')
    }

    const checkIfUserNameAlreadyInUse = await this.assignorRepository.findOne({
      where: {
        username,
        deletedAt: null
      }
    })

    if(checkIfUserNameAlreadyInUse) {
      throw new UnauthorizedException('Username already in use')
    }
    
    const hashedPassword = await this.bcryptAdapter.hash(password);
    return await this.assignorRepository.create({
      document, 
      email, 
      name, 
      phone,
      username,
      password: hashedPassword,
      createdBy: 'any',
      updatedBy: 'any'
    })
  }

  async findOne({ id }: { id: string }) {
    return await this.assignorRepository.findOne({
      where: {
        id,
        deletedAt: null
      }
    })
  }

  async findOneByUsername({ username }: { username: string }) {
    return await this.assignorRepository.findOneByUsername({
      where: {
        username,
        deletedAt: null
      }
    })
  }

  async findAll({ filters, page, itemsPerPage }: ListDto) {
    const condition = buildFindAllFilters({filters})

    return await this.assignorRepository.findAll({
      where: condition,
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
        id,
        deletedAt: null
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
    const checkIfAssignorExists = await this.assignorRepository.findOne({
      where: {
        id,
        deletedAt: null
      }
    })

    if(!checkIfAssignorExists) {
      throw new UnauthorizedException('Assignor not found')
    }

    await this.assignorRepository.remove(id)
  }

  async sendEmailToId({ id, templateId,params  }:{ id: string, templateId: string, params: any }) {
    const assignor = await this.assignorRepository.findOne({
      where: {
        id,
        deletedAt: null
      }
    })
    
    await this.mailer.sendEmail({ to: assignor.email, templateId, params })
  }
}
