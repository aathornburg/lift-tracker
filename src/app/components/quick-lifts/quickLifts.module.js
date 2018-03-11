require('angular');

import { QuickLifts } from './QuickLifts';

export default angular
    .module('quickLiftsModule', []) 
        .directive('quickLifts', () => (
            {
                restrict: 'E',
                templateUrl: 'components/quick-lifts/quick-lifts.html',
                controller: QuickLifts,
                controllerAs: 'quickLiftsCtrl',
                scope: {},
                bindToController: true
            }
        ))
    .name;