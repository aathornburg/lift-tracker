require('angular');

import { Swappable } from './Swappable';
import { SwappableSectionService } from './SwappableSectionService';

export default angular
    .module('swappableModule', [])
        .service('swappableSectionService', SwappableSectionService)
        .directive('swappableSectionGroup', (swappableSectionService) => (
            {
                restrict: 'E',
                controller: Swappable,
                controllerAs: 'swapCtrl',
                transclude: true,
                template: '<div class="swappable-section-container" ng-transclude></div>',
                link: {
                    pre: (scope, elem, attrs, swapCtrl) => {
                        swappableSectionService.public.initSectionGroup(elem, swapCtrl);
                    }
                }
            }
        ))
        .directive('swappableShowWhen', (swappableSectionService) => (
            {
                restrict: 'A',
                scope: {},
                require: '^swappableSectionGroup',
                link: (scope, elem, attrs, swapCtrl) => {
                    swappableSectionService.public.initSection(elem, attrs, swapCtrl);
                }
            }
        ))
    .name;