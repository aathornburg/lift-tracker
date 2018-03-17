require('angular');

import { AllLifts } from './all-lifts/AllLifts';
import { AddLiftWeight } from './add-lift-weight/AddLiftWeight';
import { Lift } from './lift/Lift';

/* Utilities */
import { dropdown } from '../../utility/dropdown';

export default angular
    .module('liftModule', []) 
        .directive('allLifts', () => (
            {
                restrict: 'E',
                templateUrl: 'components/lift-components/all-lifts/all-lifts.html',
                controller: AllLifts,
                controllerAs: 'allLiftsCtrl',
                scope: {},
                bindToController: true,
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
                },
                link: (scope, elem, attrs, ctrl) => {
                    dropdown.init(elem, false);
                }
            }
        ))
    .name;