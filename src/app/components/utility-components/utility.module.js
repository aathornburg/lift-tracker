// TODO:  Remove this?

require('angular');

import { errorsModule } from './form-components/errors.module';
import { dropdownModule } from './overlay-components/dropdown/dropdown.module';
import { modalModule } from './overlay-components/modal/modal.module';
import { toggleModule } from './form-components/toggle/toggle.module';
import { checkboxModule } from './form-components/checkbox/checkbox.module';
import { formLabelFilterModule } from './form-components/form-label-filter/formLabelFilter.module';

export default angular
    .module('utilityModule', ['errorsModule', 'dropdownModule', 'modalModule',
            'toggleModule', 'checkboxModule', 'formLabelFilterModule'])
    .name;