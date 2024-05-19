import * as Joi from 'joi';
import { IPayableCreation } from '../../../integrations/types';

export const validateBody = (body: IPayableCreation) =>
  Joi.object({
    value: Joi.number().required().messages({
      'any.required': 'Value is required',
      'string.empty': 'Value is required',
    }),
    emissionDate: Joi.string().required().messages({
      'any.required': 'Data da emissão é obrigatória',
      'string.empty': 'Data da emissão é obrigatória',
    }),
    assignorId: Joi.string().min(36).max(36).required().messages({
      'any.required': 'Cedente é obrigatório',
      'array.base': 'Cedente é obrigatório.',
    }),
  }).validate(body);
