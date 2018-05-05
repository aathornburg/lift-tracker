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

                        console.log(ngModelCtrl);

                        if (!minVal || !maxVal) {
                            ngModelCtrl.$setValidity(ngModelCtrl.$name + 'LessThan', true);
                        } else {
                            console.log("Have both min and max values\nvalid? " + (+minVal < +maxVal));
                            ngModelCtrl.$setValidity(
                                ngModelCtrl.$name + 'LessThan',
                                (+minVal < +maxVal)
                            );
                        }

                        return minVal;
                    };

                    console.log(attrs.lessThan);

                    ngModelCtrl.$parsers.unshift(validate);
                    ngModelCtrl.$formatters.push(validate);

                    attrs.$observe('lessThan', (maxVal) => {
                        validate(ngModelCtrl.$viewValue);
                    });
                }
            }
        ))
    .name;