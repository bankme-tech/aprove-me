import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePayableDto {
    @IsNotEmpty({
        message: 'O valor do recebível é obrigatório',
      })
      @IsNumber({}, {
        message: 'O valor do recebível deve ser um número válido',
      })
      value: number;
    
      @IsNotEmpty({
        message: 'A data de emissão do recebível é obrigatória',
      })
      @IsDate({
        message: 'A data de emissão do recebível deve ser uma data válida',
      })
      @Type(() => Date)
      emissionDate: Date;

    }    