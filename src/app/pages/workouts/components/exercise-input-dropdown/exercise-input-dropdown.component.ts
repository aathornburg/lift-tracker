import { Component, OnInit, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Direction } from 'src/app/shared/model/direction';

@Component({
  selector: 'lt-exercise-input-dropdown',
  templateUrl: './exercise-input-dropdown.component.html',
  styleUrls: ['./exercise-input-dropdown.component.scss']
})
export class ExerciseInputDropdownComponent implements OnInit {

  @Input() moveActiveSelection: ReplaySubject<Direction>;
  @Input() dropdownIdentifier = '';

  constructor() { }

  ngOnInit() {
    this.moveActiveSelection.subscribe(
      (direction: Direction) => {
        switch (direction) {
          case Direction.Up: {
            console.log('up');
            break;
          }
          case Direction.Down: {
            console.log('down');
            break;
          }
        }
      }
    );
  }

}
