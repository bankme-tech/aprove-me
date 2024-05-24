import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AssignorService } from '../assignor.service';
import { CommonModule } from '@angular/common';
import { DocumentMaskDirective } from '../../../directives/mask-document.directive';
import { PhoneMaskDirective } from '../../../directives/mask-phone.directive';
import { AssignorModel } from '../../../models/assignor.model';

@Component({
  selector: 'app-assignor-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DocumentMaskDirective,
    PhoneMaskDirective,
  ],
  templateUrl: './assignor-form.component.html',
  styleUrl: './assignor-form.component.css',
})
export class AssignorFormComponent {
  assignorForm: FormGroup = new FormGroup({});
  assignor: AssignorModel = new AssignorModel();

  constructor(
    private fb: FormBuilder,
    private assignorService: AssignorService,
    private router: Router
  ) {
    document.title = 'Assignor - Creation';
  }

  ngOnInit() {
    this.assignorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(140)]],
      document: ['', [Validators.required, Validators.maxLength(30)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(140)],
      ],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  get name() {
    return this.assignorForm.get('name');
  }
  get document() {
    return this.assignorForm.get('document');
  }
  get email() {
    return this.assignorForm.get('email');
  }
  get phone() {
    return this.assignorForm.get('phone');
  }

  onCancel() {
    this.router.navigate(['/payables']);
  }

  onSubmit() {
    if (!this.assignorForm.valid) return;
    this.document?.setValue(this.document.value.replace(/\D/g, ''));

    this.assignorService
      .createAssignor(this.assignorForm.value)
      .subscribe((res: AssignorModel) => {
        this.router.navigate(['/assignors/', res.id]);
      });
  }
}
