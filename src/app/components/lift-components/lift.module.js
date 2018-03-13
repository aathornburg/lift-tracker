require('angular');

import { AllLifts } from './all-lifts/AllLifts';
import { AddLiftWeight } from './add-lift-weight/AddLiftWeight';
import { Lift } from './lift/Lift';

export default angular
    .module('liftModule', []) 
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
        .directive('addLiftWeight', () => (
            {
                restrict: 'E',
                templateUrl: 'components/lift-components/add-lift-weight/add-lift-weight.html',
                controller: AddLiftWeight,
                controllerAs: 'addLiftWeightCtrl',
                scope: {},
                bindToController: true
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