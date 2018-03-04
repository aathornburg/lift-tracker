require('angular');

import { Dashboard } from './Dashboard';

export default angular
    .module('dashboardModule', []) 
        .directive('dashboard', () => (
            {
                restrict: 'E',
                templateUrl: 'components/dashboard/dashboard.html',
                controller: Dashboard,
                controllerAs: 'dashboardCtrl',
                scope: {},
                bindToController: true
            }
        ))
    .name;