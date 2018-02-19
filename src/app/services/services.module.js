require('angular');

import { LiftsService } from './LiftsService';

export default angular
    .module('servicesModule', [])
        .service('liftsService', LiftsService)
    .name;