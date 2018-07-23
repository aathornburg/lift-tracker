import { Component } from '@angular/core';
import { LiftsService } from '../../services/lifts.service';

@Component({
  selector: 'lt-lifts',
  templateUrl: './lifts.component.html',
  styleUrls: ['./lifts.component.scss']
})
export class LiftsComponent {

  constructor(public liftsService: LiftsService) { }

}
