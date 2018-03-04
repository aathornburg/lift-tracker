/* @ngInject */
export const routesConfig = ($urlRouterProvider, $stateProvider, $locationProvider) => {
    $stateProvider    
    .state('home', {
            url: '/',
            template: '<dashboard />'
        })
        .state('dashboard', {
            url: '/dashboard',
            template: '<dashboard />',
        })
        .state('workouts', {
            url: '/workouts',
            template: '<workouts />'
        })
        .state('goals', {
            url: '/goals',
            templateUrl: 'components/goals/goals.html'
        });
};