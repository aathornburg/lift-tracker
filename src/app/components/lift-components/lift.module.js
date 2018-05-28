require('angular');

import { AllLifts } from './all-lifts/AllLifts';
import { Lift } from './lift/Lift';
import { addLiftModalModule } from './add-lift-modal/addLiftModal.module';

export default angular
    .module('liftModule', ['addLiftModalModule']) 
        .directive('allLifts', () => (
            {
                restrict: 'E',
                templateUrl: 'components/lift-components/all-lifts/all-lifts.html',
                controller: AllLifts,
                controllerAs: 'allLiftsCtrl',
                scope: {},
                bindToController: true
            }
        ))
        .directive('addLift', () => (
            {
                restrict: 'E',
                templateUrl: 'components/lift-components/add-lift/add-lift.html'
            }
        ))
        .directive('lift', () => (
            {
                restrict: 'E',
                templateUrl: 'components/lift-components/lift/lift.html',
                controller: Lift,
                controllerAs: 'liftCtrl',
                scope: {},
                bindToController: {
                    liftModel: '='
                }
            }
        ))
    .name;