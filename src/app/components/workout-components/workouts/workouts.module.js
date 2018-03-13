require('angular');

import { Workouts } from './Workouts';

export default angular
    .module('workoutsModule', []) 
        .directive('workouts', () => (
            {
                restrict: 'E',
                templateUrl: 'components/workout-components/workouts/workouts.html',
                controller: Workouts,
                controllerAs: 'workoutsCtrl',
                scope: {},
                bindToController: true
            }
        ))
    .name;