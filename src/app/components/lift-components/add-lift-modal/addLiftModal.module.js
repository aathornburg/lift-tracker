require('angular');

import { AddLiftModal } from './AddLiftModal';

export default angular
    .module('addLiftModalModule', [])
        .run(($templateCache, $http) => {
            $http.get('components/lift-components/add-lift-modal/new-set-form.html')
            .then((response) => {
                $templateCache.put('add-lift-modal-new-set-form', response.data);
            });
        })
        .directive('addLiftModal', ($compile, $templateCache) => (
            {
                restrict: 'E',
                templateUrl: 'components/lift-components/add-lift-modal/add-lift-modal.html',
                controller: AddLiftModal,
                controllerAs: 'addLiftCtrl',
                scope: {},
                bindToController: true,
                link: (scope, elem, attrs, addLiftCtrl) => {
                    elem.find('.new-set-button').on('click', () => {
                        let setForm = $compile($templateCache.get('add-lift-modal-new-set-form'))(scope);
                        $('.set-input-group').append(setForm);
                    });
                }
            }
        ))
    .name;