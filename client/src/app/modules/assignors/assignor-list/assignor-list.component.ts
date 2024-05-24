// assignors/assignor-list/assignor-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AssignorService } from '../assignor.service';
import { AssignorModel } from '../../../models/assignor.model';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-assignor-list',
  templateUrl: './assignor-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  styleUrls: ['./assignor-list.component.scss'],
})
export class AssignorListComponent implements OnInit {
  assignors: AssignorModel[] = [];
  actualPage: number = 1;

  constructor(
    private assignorService: AssignorService,
    private router: Router
  ) {
    document.title = 'Assignors - List';
  }

  ngOnInit() {
    this.assignorService.getAssignors().subscribe((data) => {
      this.assignors = data;
    });
  }

}
