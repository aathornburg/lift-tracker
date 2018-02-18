require('angular');

import { RecentLifts } from './RecentLifts';

export default angular
    .module('recentLiftsModule', [])
        .directive('recentLifts', () => (
            {
                restrict: 'E',
                templateUrl: 'components/recent-lifts/recent-lifts.html',
                controller: RecentLifts,
                controllerAs: 'recentLifts',
                scope: {},
                bindToController: true
            }
        ))
    .name;