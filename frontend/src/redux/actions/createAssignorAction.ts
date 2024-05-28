import { TAssignors } from '../../types/AssignorsType'

export const DESCRIPTION = 'CONFIRMATION_CREATE_ASSIGNOR'

export const createAssignorsAction = (data: TAssignors) => ({
  type: DESCRIPTION,
  data,
})
