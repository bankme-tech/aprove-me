import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Payable } from 'src/app/shared/interfaces/payables';

@Component({
  selector: 'app-card-payable',
  templateUrl: './card-payable.component.html',
  styleUrls: ['./card-payable.component.css'],
})
export class CardPayableComponent {
  editPayable() {
    this.editPayableEvent.emit(this.payable);
  }
  @Input() payable: Payable | undefined 
  @Output() editPayableEvent = new EventEmitter<Payable>();
}
