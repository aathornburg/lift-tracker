require('angular');

export default angular
    .module('formLabelFilterModule', [])
        .filter('labelConstraint', () => {
            return (input, constraintType) => {
                return constraintType === 'required' ?
                    input + ' *' :
                constraintType === 'optional' ?
                    input + ' (optional)' :
                    input
            };
        })
        .directive('formLabelFilter', (labelConstraintFilter) => (
            {
                restrict: 'A',
                scope: {},
                link: (scope, elem, attrs) => {
                    let labels;

                    if (attrs.formLabelFilter === 'required') {
                        labels = elem.find('[required]').siblings('label');
                    } else if (attrs.formLabelFilter === 'optional') {
                        labels = elem.find(':not([required])').siblings('label');
                    }

                    // Need to use for..of syntax because labels is an "Array-like" object
                    for (let label of labels) {
                        $(label).text(
                            labelConstraintFilter($(label).text(), attrs.formLabelFilter)
                        );
                    }
                }
            }
        ))
    .name;