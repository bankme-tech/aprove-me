import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IAssignor, IPayable } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-edit-payables',
  templateUrl: './edit-payables.component.html',
  styleUrls: ['./edit-payables.component.scss']
})
export class EditPayablesComponent {
  payableForm = new FormGroup({
    value: new FormControl('', [Validators.required]),
    assignorId: new FormControl('', [Validators.required]),
  });
  payable: IAssignor[] = []
  payableId: string = ''
  assignors: IAssignor[] = []

  constructor(
    private api: ApiService,
    private router: Router,
    private snack: MatSnackBar,
    private route: ActivatedRoute

  ) {
    this.payableId = this.route.snapshot.paramMap.get('id') || ''
    this.start(this.payableId)
  }

  start(id: string) {
    this.api.getAssignors().subscribe((assignors: IAssignor[]) => {
      this.assignors = assignors
    })
    this.api.getPayable(id).subscribe((payable: IPayable) => {
      this.payableForm.get('value')?.setValue(String(payable.value))
      this.payableForm.get('assignorId')?.setValue(String(payable.assignorId))
    })
  }

  onSubmit(): void {
    const { value, assignorId } = this.payableForm.value

    if (this.payableForm.invalid) {
      return
    }

    const payload = {
      value: Number(value),
      assignorId: assignorId || '',
    }
    this.api
      .updatePayable(this.payableId, payload)
      .subscribe((item: IPayable) => {
        this.snack.open('Payable updated', 'Close')
        this.router.navigate(['/payables'])
      });
  }
}
