// TODO:  Remove this?

require('angular');

import { dropdownModule } from './overlay-components/dropdown/dropdown.module';
import { modalModule } from './overlay-components/modal/modal.module';
import { toggleModule } from './form-components/toggle/toggle.module';
import { formLabelFilterModule } from './form-components/form-label-filter/formLabelFilter.module';

export default angular
    .module('utilityModule', ['dropdownModule', 'modalModule', 'toggleModule', 'formLabelFilterModule'])
    .name;