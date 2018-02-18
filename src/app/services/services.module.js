require('angular');

import { RecentLiftsService } from './RecentLiftsService';

export default angular
    .module('services', [])
        .service('recentLiftsService', RecentLiftsService)
    .name;