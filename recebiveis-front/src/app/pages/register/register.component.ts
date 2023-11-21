import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Payable } from 'src/app/shared/interfaces/payables';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private route: ActivatedRoute) {}


  handleCriarPayable(payableForm: FormGroup) {
    let payable : Payable = {...payableForm.value}
    console.log('Formulário criado:',payable);
  }

  currentRoute(){
    return this.route.snapshot.firstChild?.routeConfig?.path || 'payable';
  }

}
