import * as Joi from 'joi';
import { IPayableCreation } from '../../../integrations/types';

export const validateBody = (body: IPayableCreation) =>
  Joi.object({
    document: Joi.string().min(11).max(11).required().messages({
      'any.required': 'Value is required',
      'string.empty': 'Value is required',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Data da emissão é obrigatória',
      'string.empty': 'Data da emissão é obrigatória',
    }),
    phone: Joi.string().min(11).max(11).required().messages({
      'any.required': 'Cedente é obrigatório',
      'array.base': 'Cedente é obrigatório.',
    }),
    name: Joi.string().required().messages({
      'any.required': 'Cedente é obrigatório',
      'array.base': 'Cedente é obrigatório.',
    }),
  }).validate(body);
