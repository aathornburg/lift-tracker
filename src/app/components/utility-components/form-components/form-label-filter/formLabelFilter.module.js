require('angular');

export default angular
    .module('formLabelFilterModule', [])
        .directive('formLabelFilter', () => (
            {
                restrict: 'A',
                scope: {},
                link: (scope, elem, attrs) => {
                    let labels = elem.find('[required]').siblings('label');

                    for (let label of labels) { // Need to use for..of syntax because labels is an "Array-like" object
                        $(label).text($(label).text() + ' *')
                    }
                }
            }
        ))
    .name;