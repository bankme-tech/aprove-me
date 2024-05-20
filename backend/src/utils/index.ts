import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export async function validateDto(dto: any, type: any) {
  const object = plainToInstance(type, dto, {
    excludeExtraneousValues: true,
  });
  return validate(object).then((errors) => {
    if (errors.length > 0) {
      console.log(errors);
      const message = errors.map((error) => {
        return Object.values(error.constraints).join(', ');
      });

      throw new Error(JSON.stringify(message));
    }
    return object;
  });
}
