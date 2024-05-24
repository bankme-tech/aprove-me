import { Pipe, PipeTransform } from '@angular/core';
import { formatPhoneNumber } from '../helpers/format-assignor-phone';

@Pipe({ name: 'phone', standalone: true })
export class PhonePipe implements PipeTransform {
  transform(value: string | number): string {
    let phone = value?.toString();
    return formatPhoneNumber(phone);
  }
}
