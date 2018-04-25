require('angular');

import { Tooltip } from './Tooltip';
import { TooltipService } from './TooltipService';

export default angular
    .module('tooltipModule', [])
        .run(($templateCache, $http) => {
            $http.get('components/utility-components/overlay-components/tooltip/tooltip.html')
            .then((response) => {
                $templateCache.put('tooltip', response.data);
            });
        })
        .service('tooltipService', TooltipService)
        .directive('tooltipText', ($templateCache, tooltipService) => (
            {
                restrict: 'A',
                controller: Tooltip,
                controllerAs: 'tooltipCtrl',
                link: (scope, elem, attrs, ctrl) => {
                    elem.addClass('tooltip-anchor');
                    elem.append($templateCache.get('tooltip'));
                    elem.find('.tooltip').text(attrs.tooltipText);

                    $(elem).click(() => {
                        elem.toggleClass("open");
                    });
                }
            }
        ))
    .name;