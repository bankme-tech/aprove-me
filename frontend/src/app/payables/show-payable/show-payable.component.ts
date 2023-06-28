import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IPayable } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-show-payable',
  templateUrl: './show-payable.component.html',
  styleUrls: ['./show-payable.component.scss']
})
export class ShowPayableComponent {
  payable: IPayable = {
    id:'',
    value:0,
    emissionDate:'',
    assignor:{
      id:'',
      document:'',
      phone: '',
      name: '',
      email: '',
    },
  };

  payableId: string = ''

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.payableId = this.route.snapshot.paramMap.get('id') || ''
    this.start()
  }

  start() {
    this.api.getPayable(this.payableId).subscribe((data) => {
      if (data) {
        this.payable = data
      }
    })
  }
  showAssignor() {
    this.router.navigate(['assignors/'+ this.payable.assignorId])
  }

}
