import { AssignorService } from './../assignor.service';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssignorModel } from '../../../models/assignor.model';
import { PhoneMaskDirective } from '../../../directives/mask-phone.directive';
import { DocumentMaskDirective } from '../../../directives/mask-document.directive';

@Component({
  selector: 'app-assignor-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PhoneMaskDirective,
    DocumentMaskDirective,
  ],
  templateUrl: './assignor-edit.component.html',
  styleUrl: './assignor-edit.component.css',
})
export class AssignorEditComponent {
  assignorForm: FormGroup = new FormGroup({});
  assignor: AssignorModel = {} as AssignorModel;

  constructor(
    private fb: FormBuilder,
    private assignorService: AssignorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    document.title = 'Assignor - Edit';
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

    const id = this.route.snapshot.paramMap.get('id');
    this.assignorService.getAssignorById(id as string).subscribe((data) => {
      this.assignor = data;
      this.assignorForm.patchValue({
        name: this.assignor.name,
        document: this.assignor.document,
        email: this.assignor.email,
        phone: this.assignor.phone,
      });
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
    if (!this.assignorForm.valid) {
      return;
    }
    this.document?.setValue(this.document.value.replace(/\D/g, ''));
    this.assignorService
      .updateAssignor(this.assignor.id, this.assignorForm.value)
      .subscribe(() => {
        this.router.navigate(['/assignors', this.assignor.id]);
      });
  }
}
