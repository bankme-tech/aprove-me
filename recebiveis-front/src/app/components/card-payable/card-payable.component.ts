import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Payable } from 'src/app/shared/interfaces/payables';

@Component({
  selector: 'app-card-payable',
  templateUrl: './card-payable.component.html',
  styleUrls: ['./card-payable.component.css'],
})
export class CardPayableComponent {

  @Input() payable!: Payable;
  @Output() editPayableEvent = new EventEmitter<{action: string, id: string}>();

  formatValue(value: string): string {
    const numberValue = parseInt(value, 10)

    if (typeof numberValue !== 'number') {
      return 'N/A'; 
    }
    return numberValue.toFixed(2);
  }

  action(action: string) {
    this.editPayableEvent.emit({action , id : this.payable.id});
  }
}
