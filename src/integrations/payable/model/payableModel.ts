import prisma from '../../shared/db'
import { PayableDto } from '../dto/create-payable';

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