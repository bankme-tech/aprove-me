import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IAssignor } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-show-assignor',
  templateUrl: './show-assignor.component.html',
  styleUrls: ['./show-assignor.component.scss']
})
export class ShowAssignorComponent {
  assignor: IAssignor = {
      id:'',
      document:'',
      phone: '',
      name: '',
      email: '',
  };

  assignorId: string = ''

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.assignorId = this.route.snapshot.paramMap.get('id') || ''
    this.start()
  }

  start() {
    this.api.getAssignor(this.assignorId).subscribe((data) => {
      if (data) {
        this.assignor = data
      }
    })
  }

}
