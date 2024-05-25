import prisma from '../../shared/db'
import { AssignorDto } from '../dto/create.assignor';
import { PayableDto } from '../../payable/dto/create-payable';
import * as helper from '../../shared/helpers';

export const add = async (data: AssignorDto): Promise<AssignorDto> => {
  const assignor = await prisma.assignor.create({
    data: {
      document:data.document,
      email: data.email,
      phone: data.phone,
      name: data.name
    }
  })

  return assignor
}

export const findOne = async (id: string): Promise<AssignorDto> => {
  const assignor = await prisma.assignor.findUnique({
    where: { id: id }
  })
  return assignor
}

export const update = async (id: string, data: AssignorDto):Promise<AssignorDto> => {
  const assignorToUpdate = await prisma.assignor.findUnique({
    where:{ id: id}
  })

  if ( assignorToUpdate == null) {
    throw new Error(`Not found payable with ${id}`)
  }

  const assignor = helper.mergeObjects({}, assignorToUpdate)
  helper.mergeObjects(assignor, data)

  const updatedAssignor = await prisma.assignor.update({
    where: { id: id },
    data: assignor
  })

  return updatedAssignor
}

export const deleteAssignor = async (id: string):Promise<AssignorDto> => {
  const deletedAssignor = await prisma.assignor.delete({
    where: { id: id }
  })

  return deletedAssignor
}