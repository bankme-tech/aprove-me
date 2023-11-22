import { Component, Input } from '@angular/core';
import { Payable } from 'src/app/shared/interfaces/payables';

@Component({
  selector: 'app-card-payable-details',
  templateUrl: './card-payable-details.component.html',
  styleUrls: ['./card-payable-details.component.css']
})
export class CardPayableDetailsComponent {
  @Input() payable!: Payable;
  
}
