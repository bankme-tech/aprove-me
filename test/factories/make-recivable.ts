import { Recivable, RecivableProps } from "src/domain/operations/enterprise/entities/recivable"

export function makeRecivable(assignorId: string, override: Partial<RecivableProps> = {}) {
  const recivable = Recivable.create({
    assignor: assignorId,
    emissionDate: new Date(),
    value: 123123,
    
    ...override
  })

  return recivable
}