import { ngMessages } from 'angular-messages';

export default angular
    .module('errorsModule', ['ngMessages'])
        .run(($templateCache, $http) => {
            $http.get('components/lift-components/add-lift-modal/errors/add-lift-modal-default-errors.html')
            .then((response) => {
                $templateCache.put('add-lift-modal-default-errors', response.data);
            });
            $http.get('components/lift-components/add-lift-modal/errors/add-lift-modal-custom-errors.html')
            .then((response) => {
                $templateCache.put('add-lift-modal-custom-errors', response.data);
            });
        });