import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssignorService } from 'src/app/services/assignor.service';
import { Payable } from 'src/app/shared/interfaces/payables';

@Component({
  selector: 'app-form-payable',
  templateUrl: './form-payable.component.html',
  styleUrls: ['./form-payable.component.css'],
})
export class FormPayableComponent {
  @Output() createPayableEvent = new EventEmitter<Payable>();
  @Input() initialValues$!: Payable;

  createPayable() {
    if (this.payable.valid) {
      let payload: Payable = {
        ...this.payable.value,
      };
      this.createPayableEvent.emit( payload );
    }
  }
  assignors$ = this.assignorService.listAssignorIdName();

  constructor(private assignorService: AssignorService) {}

  payable: FormGroup = new FormGroup({
    emissionDate: new FormControl('', Validators.required),
    assignorId: new FormControl({}, Validators.required),
    value: new FormControl('', Validators.required),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialValues$'] && this.initialValues$) {
      this.payable.patchValue(this.initialValues$);
    }
  }
}
