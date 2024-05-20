import { Assignor, AssignorProps } from '@/app/entities/assignor';

export function makeAssignor(override: Partial<AssignorProps> = {}): Assignor {
  return new Assignor({
    document: '217389123723',
    email: 'vt.hugo.2021@gmail.com',
    name: 'hxsggsz',
    phone: '5521894783894',
    ...override,
  });
}
