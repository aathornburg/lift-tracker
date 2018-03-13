require('angular');

import { CreateFirstWorkout } from './CreateFirstWorkout';

export default angular
    .module('createFirstWorkoutModule', []) 
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