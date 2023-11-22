import { Pipe, PipeTransform } from '@angular/core';
import { Payable } from 'src/app/shared/interfaces/payables';

@Pipe({
  name: 'sortPayables'
})
export class PayablePipe implements PipeTransform {

  transform(payables: Payable[], sortOption: 'value' | 'emissionDate' | 'assignorId'): Payable[] {
    if (!payables || !sortOption) {
      return payables;
    }

    return payables.slice().sort((a, b) => {
      if (a[sortOption] < b[sortOption]) return -1;
      if (a[sortOption] > b[sortOption]) return 1;
      return 0;
    });
  }
}
