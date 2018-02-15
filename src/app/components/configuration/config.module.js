require('angular');
require('@uirouter/angularjs');

import { routesConfig } from './config.routes'

export default angular
    .module('configModule', ['ui.router'])    
    .config(routesConfig)
    .name;