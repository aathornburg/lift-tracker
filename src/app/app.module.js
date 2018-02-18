require('angular');

/** Components */
import { configModule } from './components/configuration/config.module';
import { navigationModule } from './components/navigation/navigation.module';
import { addLiftWeightModule } from './components/add-lift-weight/addLiftWeight.module';
import { recentLiftsModule } from './components/recent-lifts/recentLifts.module';

/** Services */
import { RecentLiftsService } from './services/RecentLiftsService';

export default angular
    .module('angularJSSandbox',
        ['configModule', 'navigationModule', 'addLiftWeightModule', 'recentLiftsModule']
    );