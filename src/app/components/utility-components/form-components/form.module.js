require('angular');

import { checkboxModule } from './checkbox/checkbox.module';
import { formLabelFilterModule } from './form-label-filter/formLabelFilter.module';
import { lessThanModule } from './less-than/lessThan.module';
import { toggleModule } from './toggle/toggle.module';

export default angular
    .module('formModule', ['checkboxModule', 'formLabelFilterModule', 'lessThanModule', 'toggleModule'])
    .name;