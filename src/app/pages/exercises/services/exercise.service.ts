import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise';

@Injectable()
export class ExerciseService {

  exerciseList: Array<Exercise> = [ // Mocked until list is in AWS
    new Exercise('Bench press'),
    new Exercise('Deadlift'),
    new Exercise('Squat'),
    new Exercise('Overhead press'),
    new Exercise('Barbell row'),
    new Exercise('Pull up'),
    new Exercise('Chin up')
  ];

  constructor() { }

  getAllExercises(): Promise<Array<Exercise>> {
    return new Promise((resolve) => {
      resolve(this.exerciseList);
    });
  }

  getExercises(partialExerciseName: string): Promise<Array<Exercise>> {
    return new Promise((resolve) => {
      resolve(this.exerciseList);
    });
  }
}
