require('angular');

import { swappableModule } from './swappable/swappable.module';

export default angular
    .module('displayModule', ['swappableModule'])
    .name;