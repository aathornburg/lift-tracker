import { Component, OnInit } from '@angular/core';
import { StepService } from '../../services/step.service';

@Component({
  selector: 'lt-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  constructor(private stepService: StepService) { }

  ngOnInit() {
  }

}
