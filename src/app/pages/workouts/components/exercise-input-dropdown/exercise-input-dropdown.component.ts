import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output, HostListener } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Direction } from 'src/app/shared/model/direction';
import { ExerciseService } from 'src/app/pages/exercises/services/exercise.service';
import { Exercise } from 'src/app/pages/exercises/model/exercise';
import { DropdownService } from 'src/app/shared/overlay/dropdown/services/dropdown.service';

@Component({
  selector: 'lt-exercise-input-dropdown',
  templateUrl: './exercise-input-dropdown.component.html',
  styleUrls: ['./exercise-input-dropdown.component.scss']
})
export class ExerciseInputDropdownComponent implements OnInit, OnChanges {

  @Input() moveActiveSelection: ReplaySubject<Direction>;
  @Input() dropdownIdentifier = '';
  @Input() exerciseInput: Exercise;
  @Output() exerciseNameSelected: EventEmitter<object> = new EventEmitter<object>();

  private exercises: Array<Exercise>;
  private activeExerciseIndex: number = 0;
  private activeExerciseOnInput: boolean = true;

  constructor(private exerciseService: ExerciseService, private dropdownService: DropdownService) { }

  ngOnInit() {
    this.exerciseService.getAllExercises().then(
      (exercises: Array<Exercise>) => this.exercises = exercises
    );

    this.moveActiveSelection.subscribe(
      (direction: Direction) => {
        switch (direction) {
          case Direction.Up: {
            this.handleActiveSelectionMove(this.exercises.length - 1, 0, this.activeExerciseIndex - 1);
            break;
          }
          case Direction.Down: {
            this.handleActiveSelectionMove(0, this.exercises.length - 1, this.activeExerciseIndex + 1);
            break;
          }
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exerciseInput']) {
      this.exerciseService.getExercises(changes['exerciseInput'].currentValue).then(
        (exercises: Array<Exercise>) => this.exercises = exercises
      );
    }
  }

  private handleActiveSelectionMove(indexAfterInput: number, indexBeforeInput: number, newIndex: number): void {
    if (this.activeExerciseOnInput) {
      this.activeExerciseIndex = indexAfterInput;
      this.activeExerciseOnInput = false;
      this.exerciseNameSelected.emit({name: this.exercises[this.activeExerciseIndex].name});
    } else if (this.activeExerciseIndex === indexBeforeInput) {
        this.activeExerciseOnInput = true;
        this.exerciseNameSelected.emit({onInput: true});
    } else {
      this.activeExerciseIndex = newIndex;
      this.exerciseNameSelected.emit({name: this.exercises[this.activeExerciseIndex].name});
    }
  }

  private handleExerciseInputDropdownSelection(exercise: Exercise): void {
    this.dropdownService.closeDropdown.next(this.dropdownIdentifier);
    this.exerciseNameSelected.emit(exercise.name);
  }

}
