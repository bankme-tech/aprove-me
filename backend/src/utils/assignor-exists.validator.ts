import { BadRequestException, Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({ name: 'ExistsRule', async: true })
@Injectable()
export class AssignorExistsConstraint implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(value: string, args: ValidationArguments) {
    if (!value) {
      return false
    }
    const result = await this.prisma.assignor.findUnique({
        where: { id: value },

    })
    if (result) {
      return true
    }
    
    // The record does not exist. Failing the validation.
    return  false
  }

  defaultMessage() {
    return `this assignor does not exist.`;
  }
}

export function AssignorExists(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: AssignorExistsConstraint,
      });
    };
  }