// TODO:  Remove this?

require('angular');

import { displayModule } from './display-components/display.module';
import { errorsModule } from './form-components/errors.module';
import { overlayModule } from './overlay-components/overlay.module';
import { formModule } from './form-components/form.module';

export default angular
    .module('utilityModule', ['displayModule', 'errorsModule', 'overlayModule', 'formModule'])
    .name;