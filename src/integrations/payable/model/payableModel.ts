import prisma from '../../shared/db'
import { PayableDto } from '../dto/create-payable'
import * as helper from '../../shared/helpers'

export const add = async (data: PayableDto): Promise<PayableDto> => {
  const payable = await prisma.payable.create({
    data: {
      value: data.value,
      emissionDate: data.emissionDate,
      assignor: data.assignor
    }
  })

  return payable
}

export const findOne = async (id: string): Promise<PayableDto> => {
  const payable = await prisma.payable.findUnique({
    where: { id: id }
  })
  return payable
}

export const update = async (id: string, data: PayableDto):Promise<PayableDto> => {
  const payableToUpdate = await prisma.payable.findUnique({
    where:{ id: id}
  })

  if ( payableToUpdate == null) {
    throw new Error(`Not found payable with ${id}`)
  }

  const payable = helper.mergeObjects({}, payableToUpdate)
  helper.mergeObjects(payable, data)

  const updatedPayable = await prisma.payable.update({
    where: { id: id },
    data: payable
  })

  return updatedPayable
}

export const deletePayable = async (id: string):Promise<PayableDto> => {
  const deletedPayable = await prisma.payable.delete({
    where: { id: id }
  })

  return deletedPayable
}