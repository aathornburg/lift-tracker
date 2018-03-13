require('angular');
require('@uirouter/angularjs');

import { NavigationBar } from './navigation-bar/NavigationBar';
import { NavigationItem } from './navigation-item/NavigationItem';
import { Dashboard } from './dashboard/Dashboard';
import { Workouts } from './workouts/Workouts';

export default angular
    .module('navigationModule', ['ui.router'])
        .directive('navigationBar', () => (
            {
                restrict: 'E',
                templateUrl: 'components/navigation-components/navigation-bar/navigation-bar.html',
                controller: NavigationBar,
                controllerAs: 'navBarCtrl',
                scope: {},
                bindToController: true
            }
        ))
        .directive('navigationItem', () => (
            {
                restrict: 'E',
                templateUrl: 'components/navigation-components/navigation-item/navigation-item.html',
                controller: NavigationItem,
                controllerAs: 'navItemCtrl',
                scope: {},
                bindToController: {
                    location: '@'
                },
                transclude: true
            }
        ))
        .directive('dashboard', () => (
            {
                restrict: 'E',
                templateUrl: 'components/navigation-components/dashboard/dashboard.html',
                controller: Dashboard,
                controllerAs: 'dashboardCtrl',
                scope: {},
                bindToController: true
            }
        ))
        .directive('lifts', () => (
            {
                restrict: 'E',
                templateUrl: 'components/navigation-components/lifts/lifts.html'
            }
        ))
        .directive('workouts', () => (
            {
                restrict: 'E',
                templateUrl: 'components/navigation-components/workouts/workouts.html',
                controller: Workouts,
                controllerAs: 'workoutsCtrl',
                scope: {},
                bindToController: true
            }
        ))
        .directive('goals', () => (
            {
                restrict: 'E',
                templateUrl: 'components/goals/goals.html'
            }
        ))
    .name;