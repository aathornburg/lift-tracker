require('angular');

/** Configuration */
import { configModule } from './configuration/config.module';

/** Services */
import { servicesModule } from './services/services.module';

/** Components */
import { navigationModule } from './components/navigation/navigation.module';
import { addLiftWeightModule } from './components/add-lift-weight/addLiftWeight.module';
import { recentLiftsModule } from './components/recent-lifts/recentLifts.module';

export default angular
    .module('angularJSSandbox',
        ['configModule', 'servicesModule', 'navigationModule', 'addLiftWeightModule', 'recentLiftsModule']
    );