import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lt-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalName: string;

  constructor() { }

  ngOnInit() {
  }

}
