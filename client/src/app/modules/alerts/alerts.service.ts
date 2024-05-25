import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AlertsService {
  constructor() { }

  success(title: string, message?: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  error(title: string, message?: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  warning(title: string, message?: string) {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  info(title: string, message?: string) {
    Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  confirm(title: string, message?: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

}
