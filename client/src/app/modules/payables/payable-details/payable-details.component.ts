import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PayableService } from '../payable.service';
import { CommonModule } from '@angular/common';
import { PayableModel } from '../../../models/payable.model';
import { DocumentPipe } from '../../../pipes/document.pipe';

@Component({
  selector: 'app-payable-details',
  templateUrl: './payable-details.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule, DocumentPipe],
  styleUrl: './payable-details.component.css',
})
export class PayableDetailsComponent implements OnInit {
  payable: PayableModel = {} as PayableModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payableService: PayableService
  ) {
    document.title = 'Payable - Details';
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.payableService.getPayableById(id as string).subscribe((data) => {
      this.payable = data;
    });
  }

  goBack() {
    this.router.navigate(['/payables']);
  }
}
