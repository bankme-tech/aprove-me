import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService, IAssignor } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-create-assignors',
  templateUrl: './create-assignors.component.html',
  styleUrls: ['./create-assignors.component.scss']
})
export class CreateAssignorsComponent {
  assignorForm = new FormGroup({
    document: new FormControl('', [
      Validators.required,
      Validators.maxLength(30)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(140)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(140)
    ]),
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private snack: MatSnackBar
  ) {  }

  onSubmit(): void {
    if (this.assignorForm.invalid) {
      return
    }

    const {document, email, phone, name } = this.assignorForm.value

    if (!document || !email || !phone || !name) {
      return
    }
    const payload: IAssignor = {document, email, phone, name }
    this.api
      .createAssignor(payload)
      .subscribe((item: IAssignor) => {
        this.snack.open('Assignor created')
        this.router.navigate(['/payables'])
      });
  }
}

