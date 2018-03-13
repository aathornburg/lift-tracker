require('angular');

import { AllLifts } from './AllLifts';

export default angular
    .module('allLiftsModule', []) 
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
    .name;