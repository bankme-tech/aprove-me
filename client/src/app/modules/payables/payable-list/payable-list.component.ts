import { Component, OnInit } from '@angular/core';
import { PayableService } from '../payable.service';
import { PayableModel } from '../../../models/payable.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-payable-list',
  templateUrl: './payable-list.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule, NgxPaginationModule],
  styleUrl: './payable-list.component.css',
})
export class PayableListComponent implements OnInit {
  payables: PayableModel[] = [];
  actualPage: number = 1;

  constructor(private payableService: PayableService, private router: Router) {
    document.title = 'Payable - list';
  }

  ngOnInit() {
    this.payableService.getPayables().subscribe((data) => {
      this.payables = data;
    });
  }

  editPayable(ev: Event, id: string) {
    ev.stopPropagation();

    this.router.navigate(['payables', 'edit', id]);
  }

  deletePayable(ev: Event, id: string) {
    // prevent event buble
    ev.stopPropagation();
    this.payableService.deletePayable(id).subscribe(() => {
      this.payables = this.payables.filter((payable) => payable.id !== id);
    });
  }
}
