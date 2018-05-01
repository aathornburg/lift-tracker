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
        .run((tooltipService, overlayControl) => {
            tooltipService.overlayControl = overlayControl.public;
        })
        .directive('tooltipText', ($templateCache, tooltipService, overlayControl) => (
            {
                restrict: 'A',
                controller: Tooltip,
                controllerAs: 'tooltipCtrl',
                link: (scope, elem, attrs, ctrl) => {
                    elem.addClass('tooltip-anchor');
                    elem.attr('tabindex', 0);
                    elem.append($templateCache.get('tooltip'));
                    elem.find('.tooltip').text(attrs.tooltipText);

                    tooltipService.public.tooltipInit(scope, elem.find('.tooltip'), elem, ctrl);
                }
            }
        ))
    .name;