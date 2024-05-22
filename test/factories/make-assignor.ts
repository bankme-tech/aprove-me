import { Assignor, AssignorProps } from "src/domain/operations/enterprise/entities/assignor"

export function makeAssignor(override: Partial<AssignorProps> = {}) {
  const assignor = Assignor.create({
    document: 'document',
    email: 'johndoe@example.com',
    phone: '1199999999',
    name: 'John Doe',
    
    ...override
  })

  return assignor
}