// TODO:  Remove this?

require('angular');

import { errorsModule } from './form-components/errors.module';
import { overlayModule } from './overlay-components/overlay.module';
import { toggleModule } from './form-components/toggle/toggle.module';
import { checkboxModule } from './form-components/checkbox/checkbox.module';
import { formLabelFilterModule } from './form-components/form-label-filter/formLabelFilter.module';

export default angular
    .module('utilityModule', ['errorsModule', 'overlayModule', 'toggleModule', 'checkboxModule', 'formLabelFilterModule'])
    .name;