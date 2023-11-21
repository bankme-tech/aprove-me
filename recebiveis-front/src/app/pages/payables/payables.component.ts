import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PayableService } from 'src/app/services/payable.service';

@Component({
  selector: 'app-payables',
  templateUrl: './payables.component.html',
  styleUrls: ['./payables.component.css'],
})
export class PayablesComponent {
  constructor(private payableS: PayableService, private router: Router) {}

  payables$ = this.payableS.getPayables();

  sortOption: 'value' | 'emissionDate' | 'assignorId' = 'value';

  setSortOption(option: 'value' | 'emissionDate' | 'assignorId') {
    this.sortOption = option;
  }

  delete(id: string) {
    this.payableS.deletePayable(id).subscribe({
      next: () => {
        console.log('Payable deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting payable in parent component:', error.message);
      },
    });
  }

  handleAction(action: { action: string; id: string }) {
    console.log(action);
    switch (action.action) {
      case 'remove':
        this.delete(action.id);
        break;

      case 'edit':
        this.router.navigate(['register/edit-payable', action.id]);
        break;
      default:
        break;
    }
  }
}
