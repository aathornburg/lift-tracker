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
        .state('lifts', {
            url: '/lifts',
            template: '<lifts />',
        })
        .state('workouts', {
            url: '/workouts',
            template: '<workouts />'
        })
        .state('goals', {
            url: '/goals',
            template: '<goals />'
        });
};