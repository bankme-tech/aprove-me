import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AssignorService } from 'src/app/services/assignor.service';
import { PayableService } from 'src/app/services/payable.service';
import { Assignor, Payable } from 'src/app/shared/interfaces/payables';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private route: ActivatedRoute,
    private assignorS: AssignorService,
    private payableS: PayableService,
    private routes: Router) {}

    payable$:Observable<any> | undefined;
    title: string = 'Novo';

    ngOnInit() {

      const idParam = this.route.snapshot.firstChild?.params['id'];
  
      if (idParam) {
        console.log('ID da rota atual:', idParam);
        this.payable$ = this.payableS.getPayableDetails(idParam)
      }
      const rota = this.route.snapshot.firstChild?.routeConfig?.path;
      this.title = rota?.includes('edit') ? 'Editar' : this.title 
    }


  handleCriarPayable(payableForm: FormGroup) {
    let payable: Payable = { ...payableForm.value };
    console.log('Formulário criado:', payable);
  }

  handleCreateAssignor($event: Assignor) {
    const assignor: Assignor = $event;

    this.assignorS.createAssignor(assignor).subscribe({
      next: (data) => {
        alert(`Assignor ${assignor.name} cadastrado com sucesso!`);
          this.routes.navigate(['/payables']);
        },
        error: () => alert('Erro ao cadastrar o assignor'),
        });

  }

  currentRoute() {
    return this.route.snapshot.firstChild?.routeConfig?.path || 'payable';
  }
}
