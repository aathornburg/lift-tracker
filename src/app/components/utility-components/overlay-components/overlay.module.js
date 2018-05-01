require('angular');

import { dropdownModule } from './dropdown/dropdown.module';
import { modalModule } from './modal/modal.module';
import { tooltipModule } from './tooltip/tooltip.module';
import { OverlayControl } from './OverlayControl';

export default angular
    .module('overlayModule', ['dropdownModule', 'modalModule', 'tooltipModule'])
        .service('overlayControl', OverlayControl)
    .name;