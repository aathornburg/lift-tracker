require('angular');
require('@uirouter/angularjs');

import { NavigationBar } from './navigation-bar/NavigationBar';
import { NavigationItem } from './navigation-item/NavigationItem';

export default angular
    .module('navigationModule', ['ui.router'])
        .directive('navigationBar', () => (
            {
                restrict: 'E',
                templateUrl: 'components/navigation/navigation-bar/navigation-bar.html',
                controller: NavigationBar,
                controllerAs: 'navBarCtrl',
                scope: {},
                bindToController: true
            }
        ))
        .directive('navigationItem', () => (
            {
                restrict: 'E',
                templateUrl: 'components/navigation/navigation-item/navigation-item.html',
                controller: NavigationItem,
                controllerAs: 'navItemCtrl',
                scope: {},
                bindToController: {
                    location: '@'
                },
                transclude: true
            }
        ))
    .name;