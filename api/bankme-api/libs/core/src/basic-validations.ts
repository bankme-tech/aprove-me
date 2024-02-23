import { cnpj, cpf } from 'cpf-cnpj-validator';
import { z } from 'zod';
import { DateTime } from 'luxon';

export class BasicValidations {
  public static isValidDate(date: string): boolean {
    const now = DateTime.fromISO(date);
    return now.isValid ?? false;
  }

  public static isValidEmail(email: string): boolean {
    const valid = z.string().email();
    return valid.safeParse(email).success;
  }

  public static isValidCNPJOrCPF(cpfCnpj: string): boolean {
    if (cpf.isValid(cpfCnpj)) return true;
    if (cnpj.isValid(cpfCnpj)) return true;
    return false;
  }
}
