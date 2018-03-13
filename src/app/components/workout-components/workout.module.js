require('angular');

import { CreateFirstWorkout } from './create-first-workout/CreateFirstWorkout';

export default angular
    .module('workoutModule', []) 
        .directive('createFirstWorkout', () => (
            {
                restrict: 'E',
                templateUrl: 'components/workout-components/create-first-workout/create-first-workout.html',
                controller: CreateFirstWorkout,
                controllerAs: 'createFirstWorkoutCtrl',
                scope: {},
                bindToController: true
            }
        ))
    .name;