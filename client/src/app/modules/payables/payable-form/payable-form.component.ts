import { PayableModel } from './../../../models/payable.model';
import { AlertsService } from './../../alerts/alerts.service';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { PayableService } from '../payable.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { NgxCurrencyDirective } from 'ngx-currency';
import { AssignorService } from '../../assignors/assignor.service';
import { AssignorModel } from '../../../models/assignor.model';

@Component({
  selector: 'app-payable-form',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyDirective,
  ],
  templateUrl: './payable-form.component.html',
  styleUrl: './payable-form.component.css',
})
export class PayableFormComponent {
  payableForm: FormGroup = new FormGroup({});
  assignors: AssignorModel[] = [];

  constructor(
    private fb: FormBuilder,
    private payableService: PayableService,
    private assignorService: AssignorService,
    private router: Router,
    private alertsService: AlertsService
  ) {
    document.title = 'Payable - Creation';
  }

  ngOnInit() {
    this.payableForm = this.fb.group({
      value: ['', [Validators.required, Validators.min(0)]],
      emissionDate: ['', Validators.required],
      assignorId: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
    });

    this.payableForm.patchValue({
      emissionDate: new Date().toISOString().split('T')[0],
      assignorId: '0',
    })


    this.assignorService.getAssignors().subscribe({
      next: (response) => {
        this.assignors = response;
        console.log(response);
      },
      error: (error) => {
        console.error(error);
        this.alertsService.error('Error', 'Assignors not found');
      },
    });
  }

  get value() {
    return this.payableForm.controls['value'];
  }
  get emissionDate() {
    return this.payableForm.controls['emissionDate'];
  }
  get assignorId() {
    return this.payableForm.controls['assignorId'];
  }
  get email() {
    return this.payableForm.controls['email'];
  }

    onCancel() {
    this.payableForm.reset();
    this.router.navigate(['/payables']);
  }

  onSubmit() {
    const formValues = this.payableForm.value;

    if (isNaN(this.payableForm.value.value)) {
      this.alertsService.error('Error', 'Value must be a number');
      return;
    }

    const entity = new PayableModel();
    entity.value = formValues.value;
    entity.emissionDate = formValues.emissionDate;
    entity.assignorEmail = formValues.email;
    entity.assignorId = formValues.assignorId;

    this.payableService.createPayable(entity).subscribe({
      next: (response) => {
        this.alertsService.success('Success', 'Payable created');
        this.router.navigate(['/payables' + response.id]);
      },

      error: (error) => {
        console.error(error);
        this.alertsService.error('Error', 'Payable not created');
      },
    });
  }
}
