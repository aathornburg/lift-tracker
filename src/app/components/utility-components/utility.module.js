// TODO:  Remove this?

require('angular');

import { dropdownModule } from './dropdown/dropdown.module';
import { modalModule } from './modal/modal.module';

export default angular
    .module('utilityModule', ['dropdownModule', 'modalModule'])
    .name;