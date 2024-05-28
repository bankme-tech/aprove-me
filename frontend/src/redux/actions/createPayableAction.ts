import { TPayable } from '../../types/PayableType'

export const DESCRIPTION = 'CONFIRMATION_CREATE_PAYABLE'

export const createPayablesAction = (data: TPayable) => ({
  type: DESCRIPTION,
  data,
})
