import { Component, Input } from '@angular/core';
import { Assignor } from 'src/app/shared/interfaces/payables';

@Component({
  selector: 'app-card-assignor-details',
  templateUrl: './card-assignor-details.component.html',
  styleUrls: ['./card-assignor-details.component.css']
})
export class CardAssignorDetailsComponent {
  @Input() assignorDetails: Assignor | undefined;
}
