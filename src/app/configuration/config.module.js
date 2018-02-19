require('angular');
require('@uirouter/angularjs');

import { routesConfig } from './config.routes';
import { prefixConfig } from './config.prefix';

export default angular
    .module('configModule', ['ui.router']) 
    .config(prefixConfig)   
    .config(routesConfig)
    .name;