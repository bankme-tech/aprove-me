import { Param, ParseUUIDPipe } from '@nestjs/common';

export const UUIDParam = (id: string) => Param(id, new ParseUUIDPipe());
