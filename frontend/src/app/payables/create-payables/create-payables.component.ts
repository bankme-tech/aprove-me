import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService, IAssignor, IPayable } from 'src/app/services/api/api.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Component({
  selector: 'app-create-payables',
  templateUrl: './create-payables.component.html',
  styleUrls: ['./create-payables.component.scss']
})
export class CreatePayablesComponent {
  payableForm = new FormGroup({
    value: new FormControl('', [Validators.required]),
    assignorId: new FormControl('', [Validators.required]),
  });
  assignors: IAssignor[] = []

  constructor(
    private api: ApiService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.start()
  }

  start() {
    this.api.getAssignors().subscribe((assignors:IAssignor[]) => {
      this.assignors = assignors
    })
  }

  onSubmit(): void {
    const {value, assignorId} = this.payableForm.value

    if (this.payableForm.invalid) {
      return
    }

    const payload = {
      value: Number(value),
      assignorId: assignorId || '',
    }
    this.api
      .createPayable(payload)
      .subscribe((item: IPayable) => {
        this.snack.open('Payable created')
        this.router.navigate(['/payables'])
      });
  }
}
