import { BadRequestException, PipeTransform } from "@nestjs/common";
import { z } from "zod";

export class ZodPipe<T extends z.ZodType>
  implements PipeTransform<unknown, z.infer<T>>
{
  constructor(private readonly schema: z.ZodType) {}

  transform(value: unknown): z.infer<T> {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException(
        new Intl.ListFormat("en-US").format(
          result.error.issues.map((issue) => issue.message),
        ),
      );
    }

    return result.data;
  }
}
