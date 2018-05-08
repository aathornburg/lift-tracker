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
                            ngModelCtrl.$setValidity(ngModelCtrl.$name + 'LessThan', true);
                        } else {
                            ngModelCtrl.$setValidity(
                                ngModelCtrl.$name + 'LessThan',
                                (+minVal < +maxVal)
                            );
                        }

                        return minVal;
                    };

                    ngModelCtrl.$parsers.unshift(validate);
                    ngModelCtrl.$formatters.push(validate);

                    attrs.$observe('lessThan', (maxVal) => {
                        validate(ngModelCtrl.$viewValue);
                    });
                }
            }
        ))
    .name;