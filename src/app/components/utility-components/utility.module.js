// TODO:  Remove this?

require('angular');

import { dropdownModule } from './overlay-components/dropdown/dropdown.module';
import { modalModule } from './overlay-components/modal/modal.module';

export default angular
    .module('utilityModule', ['dropdownModule', 'modalModule'])
    .name;