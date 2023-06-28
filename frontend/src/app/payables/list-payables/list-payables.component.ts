import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService, IPayable } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-list-payables',
  templateUrl: './list-payables.component.html',
  styleUrls: ['./list-payables.component.scss']
})
export class ListPayablesComponent {
  payables: IPayable[] = []
  constructor(private api: ApiService, private router: Router, private snack: MatSnackBar) {
    this.start()
  }
  start() {
    this.api.getPayables().subscribe((data) => {
      if (data) {
        this.payables = data
      }
    })
  }

  addPayable(): void {
    this.router.navigate([`/payables/create`]);
  }

  addAssignor(): void {
    this.router.navigate([`/assignors/create`]);
  }

  details(p: IPayable): void {
    this.router.navigate([`/payables/${p.id}`]);
  }

  delete(p: IPayable): void {
    this.api.deletePayable(p?.id || '').subscribe((payable: IPayable) => {
      this.snack.open(`Payable ${payable.id} removed`, 'Close')
      this.payables = this.payables.filter(item => item.id !== payable.id)
    })
  }

  edit(p: IPayable): void {
    this.router.navigate([`/payables/edit/${p.id}`]);
  }

}
