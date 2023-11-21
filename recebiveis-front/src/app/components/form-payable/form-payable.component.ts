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
  @Output() criarPayableEvent = new EventEmitter<FormGroup>();
  criarPayable() {
    if (this.payable.valid) {
      this.criarPayableEvent.emit(this.payable);
    }
  }
  assignors$ = this.assignorService.listAssignorIdName();

  constructor(private assignorService: AssignorService) {}

  payable: FormGroup = new FormGroup({
    emissionDate: new FormControl(''),
    assagnorId: new FormControl('', Validators.required),
    value: new FormControl(''),
  });
}
