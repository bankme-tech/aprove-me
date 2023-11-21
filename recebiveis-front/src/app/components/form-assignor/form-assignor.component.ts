import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Assignor } from 'src/app/shared/interfaces/payables';

@Component({
  selector: 'app-form-assignor',
  templateUrl: './form-assignor.component.html',
  styleUrls: ['./form-assignor.component.css'],
})
export class FormAssignorComponent {
  @Output() createAssignorEvent = new EventEmitter<Assignor>();
  @Input() assignor$: Observable<Assignor> | undefined;

 
  assignor: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.assignor = new FormGroup({
      document: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
    });

    // Se assignor$ não for nulo, inscreva-se para atualizações
    if (this.assignor$) {
      this.assignor$.subscribe((assignor) => {
        // Atualiza o formulário quando o assignor$ emite um novo valor
        this.assignor.patchValue(assignor);
      });
    }
  }
  createAssignor(){
    let assignorPayload : Assignor = {...this.assignor.value}
    this.createAssignorEvent.emit(assignorPayload);
    console.log('assignor event', assignorPayload)
  }
}
