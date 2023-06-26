import { Component } from '@angular/core';
import { ApiService } from '../services/api/api.service';

interface IPayable {
  value:number
}

@Component({
  selector: 'app-payables',
  templateUrl: './payables.component.html',
  styleUrls: ['./payables.component.scss']
})
export class PayablesComponent {
  payables = []
  constructor(private api: ApiService){
    this.start()
  }
start() {
  this.api.getPayables().subscribe((data: any) => {
    
    this.payables = data
  })
}


}
