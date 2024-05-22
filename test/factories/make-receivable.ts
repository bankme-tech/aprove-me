import { Receivable, ReceivableProps } from "src/domain/operations/enterprise/entities/receivable"

export function makeReceivable(assignorId: string, override: Partial<ReceivableProps> = {}) {
  const receivable = Receivable.create({
    assignor: assignorId,
    emissionDate: new Date(),
    value: 123123,
    
    ...override
  })

  return receivable
}