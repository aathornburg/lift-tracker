import { ngMessages } from 'angular-messages';

export default angular
    .module('errorsModule', ['ngMessages'])
        .run(($templateCache, $http) => {
            $http.get('components/lift-components/add-lift-modal/add-lift-modal-errors.html')
            .then((response) => {
                $templateCache.put('add-lift-modal-errors', response.data);
            });
        });