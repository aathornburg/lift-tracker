import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Direction } from 'src/app/shared/model/direction';
import { ExerciseService } from 'src/app/pages/exercises/services/exercise.service';
import { Exercise } from 'src/app/pages/exercises/model/exercise';

@Component({
  selector: 'lt-exercise-input-dropdown',
  templateUrl: './exercise-input-dropdown.component.html',
  styleUrls: ['./exercise-input-dropdown.component.scss']
})
export class ExerciseInputDropdownComponent implements OnInit, OnChanges {

  @Input() moveActiveSelection: ReplaySubject<Direction>;
  @Input() dropdownIdentifier = '';
  @Input() exerciseInput: string;
  private exercises: Array<Exercise>;

  constructor(private exerciseService: ExerciseService) { }

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.exercises);
    if (changes['exerciseInput']) {
      this.exerciseService.getExercises(changes['exerciseInput'].currentValue).then(
        (exercises: Array<Exercise>) => this.exercises = exercises
      );
    }
  }

}
