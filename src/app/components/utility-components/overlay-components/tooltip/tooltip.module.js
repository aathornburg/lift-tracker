require('angular');

export default angular
    .module('tooltipModule', [])
        .run(($templateCache, $http) => {
            $http.get('components/utility-components/overlay-components/tooltip/tooltip.html')
            .then((response) => {
                $templateCache.put('tooltip', response.data);
            });
        })
        .directive('tooltipText', ($templateCache) => (
            {
                restrict: 'A',
                link: (scope, elem, attrs, ctrl) => {
                    elem.addClass('tooltip-anchor');

                    let tooltip = $templateCache.get('tooltip');

                    console.log(attrs.tooltipText);
                    console.log($(tooltip).find('.tooltip'));

                    $(tooltip).find('.tooltip').text(attrs.tooltipText);
                    elem.append(tooltip);
                }
            }
        ))
    .name;