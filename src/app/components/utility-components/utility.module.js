// TODO:  Remove this?

require('angular');

import { errorsModule } from './form-components/errors.module';
import { overlayModule } from './overlay-components/overlay.module';
import { formModule } from './form-components/form.module';

export default angular
    .module('utilityModule', ['errorsModule', 'overlayModule', 'formModule'])
    .name;