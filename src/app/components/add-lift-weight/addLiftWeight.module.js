require('angular');

import { AddLiftWeight } from './AddLiftWeight';

export default angular
    .module('addLiftWeightModule', [])
        .directive('addLiftWeight', () => (
            {
                restrict: 'E',
                templateUrl: 'components/add-lift-weight/add-lift-weight.html',
                controller: AddLiftWeight,
                controllerAs: 'addLiftWeight',
                scope: {},
                bindToController: true
            }
        ))
    .name;