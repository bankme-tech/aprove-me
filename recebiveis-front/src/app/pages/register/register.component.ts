import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { AssignorService } from 'src/app/services/assignor.service';
import { PayableService } from 'src/app/services/payable.service';
import { Assignor, Payable } from 'src/app/shared/interfaces/payables';
import { Observable, config, filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private routes: Router,
    private _snackBar: MatSnackBar
  ) {}

  payable$: Observable<any> | undefined;
  title: string = 'Novo';
  idParam!: string;
  isPayable =  true;

  ngOnInit() {
    this.routes.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.handleRoute(event.urlAfterRedirects)
        this.title = event.urlAfterRedirects.includes('edit') ? 'Editar' : this.title;
      });

    this.idParam = this.route.snapshot.firstChild?.params['id'];

    if (this.idParam) {
      this.payable$ = this.payableS.getPayableDetails(this.idParam);
    }
  }

  handleRoute(url:string){
    this.isPayable = url.includes('payable')
  }

  handleCreatePayable(payable: Payable) {
    this.title == 'Editar'
      ? this.editPayable(payable)
      : this.createPayable(payable);
  }

  createPayable(payable: Payable) {
    this.assignorS
      .getAssignorDetails(payable.assignorId)
      .pipe(
        switchMap((assignedTo: Assignor) =>
          this.payableS.create({ payable, assignedTo })
        )
      )
      .subscribe({
        next: (data) => {
          const msg = 'Criado com sucesso !';
          this.openSnackBar(msg);

          this.routes.navigate(['payable-details', data.createdPayable.id]);
        },
        error(err) {
          console.log(err);
        },
      });
  }

  editPayable(payable: Payable) {
    console.log('editado');
    this.payableS.update({ ...payable, id: this.idParam }).subscribe({
      next: (data) => {
        const msg = `Editado com sucesso`;
        this.openSnackBar(msg);
        this.routes.navigate(['payable-details', this.idParam]);
      },
    });
  }

  handleCreateAssignor($event: Assignor) {
    const assignor: Assignor = $event;

    this.assignorS.createAssignor(assignor).subscribe({
      next: () => {
        const msg = `Cedente ${assignor.name} cadastrado com sucesso!`;
        this.openSnackBar(msg);
        this.routes.navigate(['/payables']);
      },
      error: () => {
        const msg = 'Algo deu errado';
        this.openSnackBar(msg);
      },
    });
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'x', {
      duration: 1000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
