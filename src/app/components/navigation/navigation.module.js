require('angular');

import { NavigationBar } from './NavigationBar';

export default angular
    .module('navigationModule', [])
        .directive('navigationBar', () => {
            return {
                restrict: 'E',
                templateUrl: 'views/navigation-bar.html',
                controller: NavigationBar
            };
        })
    .name;