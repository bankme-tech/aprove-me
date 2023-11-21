import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { AssignorService } from 'src/app/services/assignor.service';

@Component({
  selector: 'app-form-payable',
  templateUrl: './form-payable.component.html',
  styleUrls: ['./form-payable.component.css'],
})
export class FormPayableComponent {
  @Output() createPayableEvent = new EventEmitter<FormGroup>();
  createPayable() {
    if (this.payable.valid) {
      this.createPayableEvent.emit(this.payable);
    }
  }
  assignors$ = this.assignorService.listAssignorIdName();

  constructor(private assignorService: AssignorService) {}

  payable: FormGroup = new FormGroup({
    emissionDate: new FormControl('', Validators.required),
    assagnorId: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
  });
}
