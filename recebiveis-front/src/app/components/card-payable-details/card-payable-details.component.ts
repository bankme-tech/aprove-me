import { Component, Input } from '@angular/core';
import { Payable } from 'src/app/shared/interfaces/payables';

@Component({
  selector: 'app-card-payable-details',
  templateUrl: './card-payable-details.component.html',
  styleUrls: ['./card-payable-details.component.css']
})
export class CardPayableDetailsComponent {
  @Input() payable!: Payable;
  
  formatValue(value: string): string {
    const numberValue = parseInt(value, 10)
    // Verifica se o valor é um número
    if (typeof numberValue !== 'number') {
      return 'N/A'; // ou qualquer valor padrão desejado para casos em que não seja um número válido
    }

    // Formata o valor para exibir duas casas decimais
    return numberValue.toFixed(2);
  }
}
