require('angular');

import { configModule } from './configuration/config.module';
import { navigationModule } from './navigation/navigation.module';
import { addLiftWeightModule } from './add-lift-weight/addLiftWeight.module';

export default angular
    .module('angularJSSandbox',
        ['configModule', 'navigationModule', 'addLiftWeightModule']
    );