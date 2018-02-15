require('angular');

import NavigationBar from './navigation-bar/NavigationBar';
import NavigationItem from './navigation-item/NavigationItem';

export default angular
    .module('navigationModule', [])
        .directive('navigationBar', () => {
            return {
                restrict: 'E',
                templateUrl: 'components/navigation/navigation-bar/navigation-bar.html',
                controller: NavigationBar,
                controllerAs: 'navBar',
                scope: {},
                bindToController: true
            };
        })
        .directive('navigationItem', () => {
            return {
                restrict: 'E',
                templateUrl: 'components/navigation/navigation-item/navigation-item.html',
                controller: NavigationItem,
                controllerAs: 'navItem',
                scope: {},
                bindToController: {
                    location: '@'
                },
                transclude: true
            }
        })
    .name;