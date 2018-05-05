require('angular');

export default angular
    .module('lessThanModule', [])
        .directive('lessThan', (labelConstraintFilter) => (
            {
                restrict: 'A',
                require: 'ngModel',
                link: (scope, elem, attrs, ngModelCtrl) => {
                    const validate = (minVal) => {
                        let maxVal = attrs.lessThan;

                        if (!minVal || !maxVal) {
                            ngModelCtrl.$setValidity('lessThan', true);
                        } else {
                            ngModelCtrl.$setValidity(
                                'lessThan',
                                +minVal < +maxVal
                            );
                        }
                    };

                    ngModelCtrl.$parsers.push(validate);
                    ngModelCtrl.$formatters.push(validate);

                    attrs.$observe('lessThan', (maxVal) => {
                        validate(ngModelCtrl.$viewValue);
                    });
                }
            }
        ))
    .name;