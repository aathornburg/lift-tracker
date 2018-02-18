/* @ngInject */
export const routesConfig = ($urlRouterProvider, $stateProvider, $locationProvider) => {
    $stateProvider    
    .state('home', {
            url: '/',
            templateUrl: 'components/dashboard/dashboard.html'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'components/dashboard/dashboard.html',
        })
        .state('workouts', {
            url: '/workouts',
            templateUrl: 'components/workouts/workouts.html'
        })
        .state('goals', {
            url: '/goals',
            templateUrl: 'components/goals/goals.html'
        });
};