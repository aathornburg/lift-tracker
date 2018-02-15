require('angular');

import { configModule } from './configuration/config.module';
import { navigationModule } from './navigation/navigation.module';

export default angular
    .module('angularJSSandbox',
        ['configModule', 'navigationModule']
    );