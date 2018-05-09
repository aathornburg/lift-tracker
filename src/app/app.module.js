/** Packages */
require('angular');

/** Configuration */
import { configModule } from './configuration/config.module';

/** Services */
import { servicesModule } from './services/services.module';

/** Components */
import { navigationModule } from './components/navigation-components/navigation.module';
import { liftModule } from './components/lift-components/lift.module';
import { workoutModule } from './components/workout-components/workout.module';
import { utilityModule } from './components/utility-components/utility.module';

export default angular
    .module('angularJSSandbox',
        ['configModule', 'servicesModule', 'navigationModule', 'liftModule', 'workoutModule', 'utilityModule']
    );