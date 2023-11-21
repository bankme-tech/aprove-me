import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Assignor } from 'src/app/shared/interfaces/payables';

@Component({
  selector: 'app-form-assignor',
  templateUrl: './form-assignor.component.html',
  styleUrls: ['./form-assignor.component.css'],
})
export class FormAssignorComponent {
  @Output() createAssignorEvent = new EventEmitter<Assignor>();
  
  assignor: FormGroup = new FormGroup({
    document: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
  });

  createAssignor(){
    let assignorPayload : Assignor = {...this.assignor.value}
    this.createAssignorEvent.emit(assignorPayload);
    console.log('assignor event', assignorPayload)
  }
}
