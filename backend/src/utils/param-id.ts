import { Param, ParseUUIDPipe } from '@nestjs/common';

export const ParamId = (id: string) => Param(id, new ParseUUIDPipe());
