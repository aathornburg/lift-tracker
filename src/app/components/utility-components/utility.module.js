// TODO:  Remove this?

require('angular');

import { dropdownModule } from './overlay-components/dropdown/dropdown.module';
import { modalModule } from './overlay-components/modal/modal.module';
import { toggleModule } from './toggle/toggle.module';

export default angular
    .module('utilityModule', ['dropdownModule', 'modalModule', 'toggleModule'])
    .name;