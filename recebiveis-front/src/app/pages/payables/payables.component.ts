import { Component } from '@angular/core';
import { PayableService } from 'src/app/services/payable.service';

@Component({
  selector: 'app-payables',
  templateUrl: './payables.component.html',
  styleUrls: ['./payables.component.css']
})
export class PayablesComponent {

  constructor(private payableS: PayableService){}

  payables$ = this.payableS.getPayables();

  sortOption: 'value' | 'emissionDate' | 'assignorId' = 'value';


  setSortOption(option: 'value' | 'emissionDate' | 'assignorId') {
    this.sortOption = option;
    console.log(this.sortOption)
  }

}
