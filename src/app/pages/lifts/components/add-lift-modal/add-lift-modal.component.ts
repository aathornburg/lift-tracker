import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'lt-add-lift-modal',
  templateUrl: './add-lift-modal.component.html',
  styleUrls: ['./add-lift-modal.component.scss']
})
export class AddLiftModalComponent implements OnInit {

  addLiftForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.addLiftForm = new FormGroup({
      setType: new FormControl()
    });
  }

  showForm(): void {
    console.log(this.addLiftForm);
  }

}
