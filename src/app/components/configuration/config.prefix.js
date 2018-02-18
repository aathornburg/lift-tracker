/* @ngInject */
export const prefixConfig = ($locationProvider) => {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
};