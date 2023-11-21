import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AssignorService } from 'src/app/services/assignor.service';
import { PayableService } from 'src/app/services/payable.service';
import { Payable } from 'src/app/shared/interfaces/payables';

@Component({
  selector: 'app-payables-details',
  templateUrl: './payables-details.component.html',
  styleUrls: ['./payables-details.component.css'],
})
export class PayablesDetailsComponent {
  payable$!: Observable<Payable>;
  assignorDetails$!: Observable<any>;
  showAssignorDetails: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private payableService: PayableService,
    private assignorDetailsService: AssignorService
  ) {}

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');

    this.payable$ = this.payableService.getPayableDetails(id);

    this.assignorDetails$ = this.payable$.pipe(
      switchMap((payable) =>
        this.assignorDetailsService.getAssignorDetails(payable.assignorId)
      )
    );
  }

  toggleAssignorDetails() {
    this.showAssignorDetails = !this.showAssignorDetails;
  }
}
